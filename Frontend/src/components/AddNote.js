import React,{useContext, useState} from 'react'
import contextValue from "../context/notes/noteContext"

function AddNote(props) {
    const context = useContext(contextValue);
  const { addNote} = context;
  const [note, setNote] = useState({title:"", description:"", tag:""});
  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"", description:"", tag:""})
    props.showAlert("Added Successfully", "success");
  }

  const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  
  return (
    <div className="container ">
      <div class="row">
  <div class="col-sm-8">
  <img className='img-fluid' src={process.env.PUBLIC_URL + '/book3.png'} alt="book"  />
  </div>
    <div class=" col-sm-4"  style={{"borderRadius": "1rem" ,"backgroundColor" : "#384494"}}>
        <form >

          <div className="mb-md-5 mt-md-4 pb-5 ">

          <h2 className="fw-bold mb-2  text-center">iNoteBook</h2>
          <p className="text-white mb-5 text-center">Please enter your note!</p>

          <div className="form-outline form-white mb-4">
            <label className="form-label text-light"  htmlFor="typeEmailX">Title</label>
            <input type="text" className="form-control form-control-lg" value={note.title} id="title" aria-describedby="emailHelp" name='title' placeholder="Title (min length 5 character)" onChange={onChange}/>
          </div>

          <div className="form-outline form-white mb-4 ">
            <label className="form-label text-light" htmlFor="tag">Tag</label>
            <input type="text" className="form-control form-control-lg" value={note.tag} id="tag" name='tag' placeholder="Tag" onChange={onChange}/>
          </div>
          <div className="form-outline form-white mb-4 ">
            <label htmlFor="description" className='text-light' >Description</label>
            <textarea className="form-control " value={note.description} id="description" name='description' placeholder="Description (min length 5 character)" onChange={onChange}rows="4" cols="50"/>
          </div>
          <div className='text-center'>

            <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-outline-light btn-lg px-5 text-dark" onClick={handleClick}>Add Note</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default AddNote