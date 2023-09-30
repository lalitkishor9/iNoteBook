import React,{useContext, useState} from 'react'
import contextValue from "../context/notes/noteContext"

function AddNote() {
    const context = useContext(contextValue);
  const { addNote} = context;
  const [note, setNote] = useState({title:"", description:"", tag:"default"});
  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  }

  const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div className="container my-3">
        <h2>Add a Note</h2>
        <form className=" my-3">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' placeholder="title" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="description" >Description</label>
            <input type="text" className="form-control" id="description" name='description' placeholder="Description" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="description" >Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' placeholder="tag" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
        </div>
  )
}

export default AddNote