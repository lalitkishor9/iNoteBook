import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import baseUrl from '../utils';
export const Login =  (props) => {
  const [credentials, setCredentials] = useState({email : "", password : ""});
  let history = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
           
      body: JSON.stringify({email : credentials.email, password : credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success === true){
      //Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert("Logged in Successfully", "success");
      history("/");
    }
    else{
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <>
    
<div className="container ">
      <div className="row">
  <div className="col-sm-8">
  <img className='img-fluid' src={process.env.PUBLIC_URL + '/signup.svg'} alt="book"  />
  </div>
  <div className="bg-dark col-sm-4" style={{"borderRadius": "1rem"}}>
<div className="mb-md-5 mt-md-4 pb-5 text-center">

  <h2 className="fw-bold mb-2 text-uppercase text-center text-light">LOGIN</h2>
  <p className="text-white-50 mb-5 text-center">Please enter your Email and password!</p>
  
  <form onSubmit={handleSubmit}>
  
  <div className="form-outline form-white mb-4 mx-4">
    <input type="email" className="form-control form-control-lg" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" value={credentials.email} placeholder="Enter email" />
    <label className="form-label text-light"  htmlFor="typeEmailX">Email</label>
  </div>

  <div className="form-outline form-white mb-4 mx-4">
    <input  type="password" className="form-control form-control-lg" onChange={onChange} id="password" name='password' value={credentials.password} placeholder="Password"/>
    <label className="form-label text-light" htmlFor="password">Password</label>
  </div>
  <div>

  <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
  </div>
  <div >
    <p className="mb-0 text-light " style={{"marginTop" : "35px"}}>Don't have an account? <Link to="/signup" className=" fw-bold">Sign Up</Link>
    </p>
    <p className="mb-0 text-light " style={{"marginTop" : "35px"}}>Don't remember password? <Link to="/forgotPassword" className=" fw-bold">Reset Password</Link>
    </p>
  </div>
</form>
</div>
  </div>
</div> 
</div>
      
    </>
  )
}