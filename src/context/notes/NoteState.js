// import { useState } from 'react';
import { useState } from 'react';
import NoteContext from './noteContext';


const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

      //Get all Notes
      const getNotes = async ()=>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
            
          }
        });
 
        const json = await response.json();
        // console.log(json);
        setNotes(json);
      }

      //Add a Note
      const addNote = async (title,description,tag)=>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
           
          body: JSON.stringify({title, description, tag}),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
        // console.log(json);
        // adding a new note
        // const note = {
        //   "_id": "64e0bc745033e40163f8e6fa6",
        //   "user": "64df07e62ce2a1ce955640bc",
        //   "title": title,
        //   "description": description,
        //   "tag": tag,
        //   "Date": "2023-08-19T12:58:28.577Z",
        //   "__v": 0
        // };
      }

      //Edit a Note
      const editNote = async (id, title,description,tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
           
          body: JSON.stringify({title, description,tag}),
        });
        const json = await response.json(); 
        console.log(json);
        
        let newNotes = JSON.parse(JSON.stringify(notes));
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            // break;
          }
        }
        setNotes(newNotes)
      }

      //delete a Note
      const deleteNote = async(id)=>{
        //TODO: API call
        
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json(); 
        console.log(json);

        const newNotes = notes.filter((notes)=>{return notes._id !== id});
        setNotes(newNotes);
      }
      
    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState