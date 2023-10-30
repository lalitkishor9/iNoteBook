import React,{useContext} from "react";
import contextValue from "../context/notes/noteContext"

function Noteitem(props) {
  const context = useContext(contextValue);
  const {deleteNote} = context;
  const { notes, updateNote } = props;
  return (
    <div class="col-12 col-sm-6 col-lg-3 my-4">
    <div class="card " style={{"backgroundColor" : "#e585b0"}}>
      <div class="card-body">
        <h4 class="card-title">{notes.title}</h4>
        <h6 class="card-subtitle mb-2">{notes.tag}</h6>
        <p class="card-text">Apart from being regarded as the City of Music because of its musical legacy, it is also said to be "The City of Dreams".</p>
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
