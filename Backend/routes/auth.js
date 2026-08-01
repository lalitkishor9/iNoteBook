const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser");
const {sendMail} = require("../service/SendEmail");
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET;
const signToken = user => jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: '7d' });


// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createUser', [
    body('name','Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password','password must be atleast 5 characters').isLength({min:6}),
],async (req,res)=>{
  if (!JWT_SECRET) return res.status(500).json({ success: false, error: 'Server authentication is not configured' });
  let success = false;
  //if there is an error send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,errors: errors.array()});
    }
    try {
    // Check whether the user with this email already exist
    let user = await User.findOne({email: req.body.email});
    if(user)
    return res.status(400).json({success, errors: "sorry a user with this email already exists"});
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    //Create a new User
    user = await User.create({
      name : req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const authToken = signToken(user);
    success = true;
    res.json({ success, authToken});
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
  if (!JWT_SECRET) return res.status(500).json({ success: false, error: 'Server authentication is not configured' });
  let success = false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
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
        success = false;
        return res.status(400).json({success, error: "Please try to login with correct credentials"});
      }

      const authToken = signToken(user);
      success = true;
      res.json({success, authToken});
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

// ROUTE 4: Send the verification code: POST "/api/auth/resetpassword" . No Login required
router.post('/userverification', [
  body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const resetPasswordCode = crypto.randomInt(100000, 999999).toString();
    user.passwordResetToken = crypto.createHash('sha256').update(resetPasswordCode).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    const response = await sendMail(email, resetPasswordCode);
    if (response.success) { // Check if the email was sent successfully
      res.json({ success: true, message: 'A reset code has been sent to your email.' });
    } else {
      res.status(500).json({ error: "Failed to send reset password email" });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occurred");
  }
});

// ROUTE 5: Reset the user password: POST "/api/auth/updatepassword" . No Login required
router.post('/updatepassword', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({min:6}),
  body('code', 'Reset code is required').isLength({min:6, max:6}),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password, code } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const resetToken = crypto.createHash('sha256').update(code).digest('hex');
    let user = await User.findOne({ email, passwordResetToken: resetToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ success : false, error: "Please try to login with correct credentials" });
    }

    user.password = secPass;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occurred");
  }
});


module.exports = router;
