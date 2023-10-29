import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
export const Signup = (props) => {

  const [credentials, setCredentials] = useState({name : "", email : "", password : "", cpassword : ""});
  let history = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
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
    <div >
      <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src={process.env.PUBLIC_URL + '/signup.svg'}
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <div className="card bg-dark text-white " style={{"borderRadius": "1rem"}}>
          <div className="card-body p-5 text-center ">
        <form onSubmit={handleSubmit}>

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">SIGNUP</h2>
              <p className="text-white-50 mb-5">Please create your account!</p>
                    
              <div className="form-outline form-white mb-4">
              <input type="text" className="form-control form-control-lg" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Name" />
                      <label className="form-label" htmlFor="form3Example1">Name</label>
              </div>
              <div className="form-outline form-white mb-4">
                <input type="email" className="form-control form-control-lg" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                <label className="form-label" htmlFor="typeEmailX">Email</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" className="form-control form-control-lg" id="password" name="password" onChange={onChange} placeholder="Set Password" required minLength={5}/>
                <label className="form-label" htmlFor="typePasswordX">Password</label>
              </div>

              <button className="btn btn-outline-light btn-lg px-5" type="submit">Sign up</button>
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
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Name"/>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password" required minLength={5}/>
      </div>
      <div className="form-group">
        <label htmlFor="cpassword">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Confirm Password" required minLength={5}/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form> */}
  </div>
  )
}
