// import { useState } from 'react';
import { useState } from 'react';
import NoteContext from './noteContext';


const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "64e065a23f4b9fc22029351e6",
          "user": "64df07e62ce2a1ce955640bc",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "Date": "2023-08-19T06:48:02.310Z",
          "__v": 0
        },
        {
          "_id": "64e08500b4eb3460d99d3b205",
          "user": "64df07e62ce2a1ce955640bc",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "Date": "2023-08-19T09:01:52.136Z",
          "__v": 0
        },
        {
          "_id": "64e0bc685033e40163f8e6fa4",
          "user": "64df07e62ce2a1ce955640bc",
          "title": "first",
          "description": "Wake up",
          "tag": "personal",
          "Date": "2023-08-19T12:58:16.086Z",
          "__v": 0
        },
        {
          "_id": "64e0bc745033e40163f8e6fa6",
          "user": "64df07e62ce2a1ce955640bc",
          "title": "second",
          "description": "Running",
          "tag": "personal",
          "Date": "2023-08-19T12:58:28.577Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial);

      //Add a Note
      const addNote = ()=>{
        //TODO: API call
        note = {
          "_id": "64e0bc745033e40163f8e6fa6",
          "user": "64df07e62ce2a1ce955640bc",
          "title": "second Added",
          "description": "Running [Added]",
          "tag": "personal",
          "Date": "2023-08-19T12:58:28.577Z",
          "__v": 0
        };
        setNotes(notes.push(note));
      }

      //Edit a Note
      const editNote = ()=>{

      }

      //delete a Note
      const deleteNote = ()=>{

      }
    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;