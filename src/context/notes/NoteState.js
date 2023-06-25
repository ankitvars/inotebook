import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:7000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // fetch all notes
  const fetchAll = async () => {
    // to fetch api
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const res = await response.json();
    // console.log(res);
    setNotes(res);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // const json = response.json();
    console.log(response);
    // to do api call
    // console.log("Deleting the node with id => ", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    console.log('ID:', id);
    try {
      // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      console.log(response);
      let newNotes = [...notes];
      const index = newNotes.findIndex(note => note._id === id);
      if (index !== -1) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        setNotes(newNotes);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <NoteContext.Provider
      value={{ notes, deleteNote, fetchAll, editNote, addNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
