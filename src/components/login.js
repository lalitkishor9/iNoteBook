import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';

export const Login =  (props) => {
  const [credentials, setCredentials] = useState({email : "", password : ""});
  let history = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
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
    <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src={process.env.PUBLIC_URL + '/signup.svg'}
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <div className="card bg-dark text-white " style={{"borderRadius": "1rem;"}}>
          <div className="card-body p-5 text-center ">
        <form onSubmit={handleSubmit}>

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">LOGIN</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <div className="form-outline form-white mb-4">
                <input type="email" className="form-control form-control-lg" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" value={credentials.email} placeholder="Enter email" />
                <label className="form-label"  htmlFor="typeEmailX">Email</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" className="form-control form-control-lg" onChange={onChange} id="password" name='password' value={credentials.password} placeholder="Password" />
                <label className="form-label" htmlFor="typePasswordX">Password</label>
              </div>

              <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
            </div>

            <div>
              <p className="mb-0">Don't have an account? <Link to="/signup" className=" fw-bold">Sign Up</Link>
              </p>
            </div>

        </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

      {/* 
      INITIAL CODE
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" value={credentials.email} placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" onChange={onChange} id="password" name='password' value={credentials.password} placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form> */}
    </>
  )
}