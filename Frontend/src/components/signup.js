import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import baseUrl from '../utils';
export const Signup = (props) => {

  const [credentials, setCredentials] = useState({name : "", email : "", password : "", cpassword : ""});
  let history = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`${baseUrl}/api/auth/createuser`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
           
      body: JSON.stringify({name, email, password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.success === true){
      //Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      history("/");
      props.showAlert("Account Created Successfully", "success");
    }
    else{
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (

 <div className="container ">
      <div className="row">
  <div className="col-sm-8">
  <img className='img-fluid' src={process.env.PUBLIC_URL + '/signup.svg'} alt="book"  />
  </div>
  <div className="bg-dark col-sm-4" style={{"borderRadius": "1rem"}}>
<div className="mb-md-5 mt-md-4 pb-5 text-center">

  <h2 className="fw-bold mb-2 text-uppercase text-center text-light">SIGNUP</h2>
  <p className="text-white-50 mb-5 text-center">Please create your account!</p>
  
  <form onSubmit={handleSubmit}>

  <div className="form-outline form-white mb-4 mx-4">
        <input type="text" className="form-control form-control-lg" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Name"/>
        <label className="form-label text-light" htmlFor="name">Name</label>
  </div>
  
  <div className="form-outline form-white mb-4 mx-4">
    <input type="email" className="form-control form-control-lg" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
    <label className="form-label text-light"  htmlFor="typeEmailX">Email</label>
  </div>

  <div className="form-outline form-white mb-4 mx-4">
    <input  type="password" className="form-control form-control-lg" id="password" name="password" onChange={onChange} placeholder="Enter Password" required minLength={5}/>
    <label className="form-label text-light" htmlFor="password">Password</label>
  </div>

  <button className="btn btn-outline-light btn-lg px-5" type="submit">Signup</button>
</form>
</div>
  </div>
</div> 

</div>
  )
}
