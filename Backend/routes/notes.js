const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require('../models/Note');
const { query, validationResult, body } = require('express-validator');

// ROUTE 1: Get All notes using: GET "/api/notes/fetchallnotes" . Login Required
router.get('/fetchallnotes',fetchUser, async(req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal Server error");
    }
})

// ROUTE 2: Add a new note using: POST "/api/notes/addnote" . Login Required
router.post('/addnote',fetchUser, [
    body('title','Enter a valid title').isLength({min:3}),
    body('description', 'Enter at least 5 characters in Description').isLength({min: 5}),
],async(req,res)=>{
    try {
        
        const {title, description,tag} = req.body;
    
        //if there is an error send bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }
    
        const note = new Note({
            title,description,tag, user: req.user.id
        })
    
        const  saveNote = await note.save();
    
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// ROUTE 3: Update an existing note: PUT "/api/notes/updatenote" . Login Required
router.put('/updatenote/:id',fetchUser,async(req,res)=>{
    try {
        const {title, description,tag} = req.body;

        //Create a newNote object
        const newNote = {};
        if(title) {newNote.title = title}
        if(description) {newNote.description = description}
        if(tag) {newNote.tag = tag}

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true});
        res.json(note);
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal Server error");
    }
});

// ROUTE 3: Update an existing note: DELETE "/api/notes/deletenode" . Login Required
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
    try {

        //Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found")}

        //Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal Server error");
    }
});
module.exports = router;