const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = 'lalitkishor$21';


// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createUser', [
    body('name','Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password','password must be atleast 5 characters').isLength({min:6}),
],async (req,res)=>{
  //if there is an error send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    try {
    // Check whether the user with this email already exist
    let user = await User.findOne({email: req.body.email});
    if(user)
    return res.status(400).json({errors: "sorry a user with this email already exists"});
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    //Create a new User
    user = await User.create({
      name : req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data = {
      user:{
        "id":user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    res.json({authToken});
  } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
  }
    // .then(user=>res.json(user)).catch(err=>{console.log(err),res.json({error: "please enter valid values", })});

})



//ROUTE 2:Aurhenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password','password can not be blank').exists(),
],async (req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }


    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "please try to login with correct credentials"});
      }

      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }

      const data = {
        user:{
          "id":user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      res.json({authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal error occured");
    }
})


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser" . Login Required
router.post('/getuser',fetchUser,async (req,res)=>{

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal error occured");
      
  }
})
module.exports = router;