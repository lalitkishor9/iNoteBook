import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import ResetPass from "./components/ResetPass";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert = {alert}/>
          <div className="container">
            <Routes>
              //Route for home component
              <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
              //Route for About component
              <Route exact path="/about" element={<About />}></Route>
              //Route for Login component
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
              //Route for Signup component
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
              //Route for Signup component
              <Route exact path="/forgotPassword" element={<ResetPass/>}></Route>
              
            </Routes>
          </div>
        </Router>
  
      </NoteState>
    </>
  );
}

export default App;
