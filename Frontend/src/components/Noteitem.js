import React,{useContext} from "react";
import contextValue from "../context/notes/noteContext"

function Noteitem(props) {
  const context = useContext(contextValue);
  const {deleteNote} = context;
  const { notes, updateNote } = props;
  return (
    <div className="col-12 col-sm-6 col-lg-3 my-4">
    <div className="card " style={{"backgroundColor" : "#e585b0"}}>
      <div className="card-body">
        <h4 className="card-title">{notes.title}</h4>
        <h6 className="card-subtitle mb-2">{notes.tag}</h6>
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
