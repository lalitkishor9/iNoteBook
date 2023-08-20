import React from "react";

function Noteitem(props) {
  const { notes } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title} fklshfskjhfjksfhkdjhfkljdfkshdkfhslkflksdfhskdhk</h5>
          <p className="card-text">{notes.description}</p>
          <div className="d-flex flex-row-reverse">
            <i className="fa-regular fa-trash-can fa-xl mx-4 " style={{color:"red"}}></i>
            <i className="fa-regular fa-pen-to-square fa-xl " style={{color:"blue"}}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
