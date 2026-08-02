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
import NoteDetail from "./components/NoteDetail";

export default function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type = "success") => { setAlert({ msg, type }); window.setTimeout(() => setAlert(null), 2800); };
  return <NoteState><Router><div className="app-shell"><Navbar /><Alert alert={alert} /><Routes>
    <Route path="/" element={<Home showAlert={showAlert} />} />
    <Route path="/notes/:id" element={<NoteDetail showAlert={showAlert} />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login showAlert={showAlert} />} />
    <Route path="/signup" element={<Signup showAlert={showAlert} />} />
    <Route path="/resetpassword" element={<ResetPass showAlert={showAlert} />} />
  </Routes></div></Router></NoteState>;
}
