import React , { useContext } from 'react'
import contextValue from "../context/notes/noteContext"
import Noteitem from './Noteitem';

function Notes() {
const context = useContext(contextValue);
  const {notes, addNote} = context;
  return (
    <div className="row my-3">
        <h2>Your Notes</h2>
            {notes.map((note)=>{
                return <Noteitem key = {note._id} notes = {note}/>;
            })}
    </div>
  )
}

export default Notes