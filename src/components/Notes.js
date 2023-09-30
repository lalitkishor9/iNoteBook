import React, { useContext, useEffect, useRef, useState } from "react";
import contextValue from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

function Notes() {
  const context = useContext(contextValue);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
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
        console.log("Updating the note...", note);
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        
      }
      const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
      }
  return (
    <>
      <AddNote />
      <button type="button" ref = {ref} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
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
            <input type="text" className="form-control" value={note.etitle} id="etitle" aria-describedby="emailHelp" name='etitle' placeholder="title" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="description" >Description</label>
            <input type="text" className="form-control" value={note.edescription} id="edescription" name='edescription' placeholder="Description" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="description" >Tag</label>
            <input type="text" className="form-control" value={note.etag} id="etag" name='etag' placeholder="tag" onChange={onChange}/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref = {refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} notes={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;


// import React, { useContext, useEffect, useRef, useState } from "react";
// import contextValue from "../context/notes/noteContext";
// import Noteitem from "./Noteitem";
// import AddNote from "./AddNote";

// function Notes() {
//   const context = useContext(contextValue);
//   const { notes, getNotes } = context;
//   useEffect(() => {
//     // eslint-disable-next-line
//     getNotes();
//   }, [getNotes]);
//   const ref = useRef(null);
//   const updateNote = (CurrentNote) => {
//     ref.current.click();
//     setNote({etitle:CurrentNote.title, edescription: CurrentNote.description, etag:CurrentNote.tag});
//   };
//   const [note, setNote] = useState({etitle:"", edescription:"", etag:"default"});
  
//   const onChange = (e)=>{
//     setNote({...note,[e.target.name]:e.target.value})
//   }

//   return (
//     <>
//       <AddNote />
//     <button type="button"  className="btn d-none btn-primary"  ref = {ref} data-toggle="modal" data-target="#exampleModal">
//       Launch demo modal
//     </button>

// <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div className="modal-dialog" role="document">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
//         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div className="modal-body">
//       <form className=" my-3">
//           <div className="form-group">
//             <label htmlFor="title">Title</label>
//             <input type="text" className="form-control" value={note.etitle} id="etitle" aria-describedby="emailHelp" name='etitle' placeholder="title" onChange={onChange}/>
//           </div>
//           <div className="form-group">
//             <label htmlFor="description" >Description</label>
//             <input type="text" className="form-control" value={note.edescription} id="edescription" name='edescription' placeholder="Description" onChange={onChange}/>
//           </div>
//           <div className="form-group">
//             <label htmlFor="description" >Tag</label>
//             <input type="text" className="form-control" value={note.etag} id="etag" name='etag' placeholder="tag" onChange={onChange}/>
//           </div>
//         </form>
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//         <button type="button" className="btn btn-primary">Update Note</button>
//       </div>
//     </div>
//   </div>
// </div>
//       <div className="row my-3">
//         <h2>Your Notes</h2>
//         {notes.map((note) => {
//           return (
//             <Noteitem key={note._id} updateNote={updateNote} notes={note} />
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default Notes;
