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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZjA3ZTYyY2UyYTFjZTk1NTY0MGJjIn0sImlhdCI6MTY5MjMzOTcwOX0.M_dLs6tjxR_hHms28XV8aTQ68UfenMZgeNp73_PUE3c"
          }
        });
 
        const json = await response.json();
        console.log(json);
        setNotes(json);
      }

      //Add a Note
      const addNote = async (title,description,tag)=>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZjA3ZTYyY2UyYTFjZTk1NTY0MGJjIn0sImlhdCI6MTY5MjMzOTcwOX0.M_dLs6tjxR_hHms28XV8aTQ68UfenMZgeNp73_PUE3c"
          },
           
          body: JSON.stringify({title, description, tag}),
        });
        const json = await response.json();
        console.log(json);
        // adding a new note
        const note = {
          "_id": "64e0bc745033e40163f8e6fa6",
          "user": "64df07e62ce2a1ce955640bc",
          "title": title,
          "description": description,
          "tag": tag,
          "Date": "2023-08-19T12:58:28.577Z",
          "__v": 0
        };
        setNotes(notes.concat(note));
      }

      //Edit a Note
      const editNote = async (id, title,description,tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZjA3ZTYyY2UyYTFjZTk1NTY0MGJjIn0sImlhdCI6MTY5MjMzOTcwOX0.M_dLs6tjxR_hHms28XV8aTQ68UfenMZgeNp73_PUE3c"
          },
           
          body: JSON.stringify({title, description,tag}),
        });
        const json = await response.json(); 
        console.log(json);
        

        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
        }
      }

      //delete a Note
      const deleteNote = async(id)=>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZjA3ZTYyY2UyYTFjZTk1NTY0MGJjIn0sImlhdCI6MTY5MjMzOTcwOX0.M_dLs6tjxR_hHms28XV8aTQ68UfenMZgeNp73_PUE3c"
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