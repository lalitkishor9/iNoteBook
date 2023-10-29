import React,{useContext} from "react";
import contextValue from "../context/notes/noteContext"

function Noteitem(props) {
  const context = useContext(contextValue);
  const {deleteNote} = context;
  const { notes, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title} </h5>
          <p className="card-text">{notes.description}</p>
          <div className="d-flex flex-row-reverse">
            <i className="fa-regular fa-trash-can fa-xl mx-4 " style={{color:"red"}} onClick={()=>{deleteNote(notes._id); props.showAlert("Deleted Successfully", "success");}} ></i>
            <i className="fa-regular fa-pen-to-square fa-xl " onClick={()=>{updateNote(notes); }} style={{color:"blue"}} ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
