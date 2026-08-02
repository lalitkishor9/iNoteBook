import { useState } from "react";
import NoteContext from "./noteContext";
import baseUrl from "../../utils";

export default function NoteState({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const request = async (path, options = {}) => {
    const response = await fetch(`${baseUrl}${path}`, { ...options, headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem("token"), ...options.headers } });
    const data = await response.json();
    if (!response.ok) { const error = new Error(data.error || data.message || "Something went wrong. Please try again."); error.status = response.status; throw error; }
    return data;
  };
  const getNotes = async () => { setLoading(true); try { const result = await request("/api/notes/fetchallnotes"); setNotes(result.notes || result); } finally { setLoading(false); } };
  const getNote = async id => {
    try {
      return await request(`/api/notes/note/${id}`);
    } catch (error) {
      // Supports the currently deployed API until its dedicated single-note route is released.
      if (error.status !== 404) throw error;
      const result = await request("/api/notes/fetchallnotes");
      const note = (result.notes || result).find(item => item._id === id);
      if (!note) throw new Error("Note not found");
      return note;
    }
  };
  const addNote = async (title, description, tag) => { const note = await request("/api/notes/addnote", { method:"POST", body:JSON.stringify({ title, description, tag }) }); setNotes(current => [note, ...current]); return note; };
  const editNote = async (id, title, description, tag) => { const note = await request(`/api/notes/updatenote/${id}`, { method:"PUT", body:JSON.stringify({ title, description, tag }) }); setNotes(current => current.map(item => item._id === id ? note : item)); return note; };
  const deleteNote = async id => { await request(`/api/notes/deletenote/${id}`, { method:"DELETE" }); setNotes(current => current.filter(note => note._id !== id)); };
  const togglePin = async note => { const updated = await request(`/api/notes/updatenote/${note._id}`, { method:"PUT", body:JSON.stringify({ pinned: !note.pinned }) }); setNotes(current => current.map(item => item._id === note._id ? updated : item)); };
  return <NoteContext.Provider value={{ notes, loading, getNotes, getNote, addNote, editNote, deleteNote, togglePin }}>{children}</NoteContext.Provider>;
}
