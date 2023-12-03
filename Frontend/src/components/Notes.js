import React, { useContext, useEffect, useRef, useState } from "react";
import contextValue from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(contextValue);
  let history = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
      history('/login');
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:"default"});
  const updateNote = (CurrentNote) => {
        ref.current.click();
        setNote({id : CurrentNote._id,etitle:CurrentNote.title, edescription: CurrentNote.description, etag:CurrentNote.tag});
      };
      const handleClick = (e)=>{
        // console.log("Updating the note...", note);
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
      }
      const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
      }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button type="button" ref = {ref} className="btn d-none btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

      <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form className=" my-3">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" value={note.etitle} id="etitle" aria-describedby="emailHelp" name='etitle' placeholder="title" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description" >Tag</label>
            <input type="text" className="form-control" value={note.etag} id="etag" name='etag' placeholder="tag" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="description" >Description</label>
            <input type="text" className="form-control" value={note.edescription} id="edescription" name='edescription' placeholder="Description" onChange={onChange} />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref = {refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3">
        <h1><span style={{ "color" : "white"}}>Your Notes</span></h1>
        <div className='container'>
        {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} notes={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;



