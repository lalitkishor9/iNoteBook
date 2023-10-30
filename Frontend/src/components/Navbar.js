import React from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";


const Navbar = () => {
  let history = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    history('/login');
  }
  let location = useLocation();
  return (
    <>
      <nav className=" fixed-top navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link style={{ "backgroundColor": location.pathname === "/" ? "#e52165" : "" , "borderRadius": "12px" }} className={`nav-link active mx-4 `}  to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link style={{ "backgroundColor": location.pathname === "/about" ? "#e52165" : "" , "borderRadius": "12px"}} className={`nav-link active mx-2`} to="/about">
                  About
                </Link>
              </li>
              
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
            </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
