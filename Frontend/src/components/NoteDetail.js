import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

const formattedDate = value => new Intl.DateTimeFormat(undefined, { dateStyle: "long", timeStyle: "short" }).format(new Date(value));

export default function NoteDetail({ showAlert }) {
  const { id } = useParams(); const navigate = useNavigate(); const { getNote, togglePin, deleteNote } = useContext(NoteContext);
  const [note, setNote] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { if (!localStorage.getItem("token")) { navigate("/login"); return; } getNote(id).then(setNote).catch(error => { showAlert(error.message, "danger"); navigate("/"); }).finally(() => setLoading(false)); }, [id, getNote, navigate, showAlert]);
  const pin = async () => { try { await togglePin(note); setNote(current => ({ ...current, pinned: !current.pinned })); } catch (error) { showAlert(error.message, "danger"); } };
  const remove = async () => { if (!window.confirm(`Delete "${note.title}"?`)) return; try { await deleteNote(note._id); showAlert("Note deleted"); navigate("/"); } catch (error) { showAlert(error.message, "danger"); } };
  if (loading) return <main className="page detail-state">Loading note...</main>;
  if (!note) return null;
  return <main className="page note-detail"><Link className="back-link" to="/">&larr; Back to workspace</Link><article className="detail-paper"><header><div><span className="tag">{note.tag || "General"}</span><h1>{note.title}</h1><p>Last updated {formattedDate(note.updatedAt || note.Date)}</p></div><div className="detail-actions"><button className={`button button-outline ${note.pinned ? "focused" : ""}`} onClick={pin}>{note.pinned ? "In focus" : "Add to focus"}</button><button className="button button-danger" onClick={remove}>Delete note</button></div></header><div className="detail-divider"></div><div className="note-content">{note.description}</div></article></main>;
}
