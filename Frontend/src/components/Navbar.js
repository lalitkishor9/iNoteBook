import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const signedIn = Boolean(localStorage.getItem("token"));
  const logout = () => { localStorage.removeItem("token"); navigate("/login"); };
  return <header className="topbar">
    <Link className="brand" to={signedIn ? "/" : "/about"}><span className="brand-mark">✦</span>notely</Link>
    <nav className="nav-links">
      {signedIn && <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">My notes</Link>}
      <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
      {signedIn ? <button className="button button-quiet" onClick={logout}>Log out</button> : <><Link className="nav-link" to="/login">Sign in</Link><Link className="button button-primary" to="/signup">Get started</Link></>}
    </nav>
  </header>;
}
