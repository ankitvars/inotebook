/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    showAlert("Your Note is now added!", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h1>Add a Note</h1>
      <form className="my-3">
        <div className="input-group mb-3">
          <span className="input-group-text" id="title">
            Title
          </span>
          <input
            name="title"
            type="text"
            className="form-control"
            placeholder="Type..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={onChange}
            value={note.title}
            id="title"
          />
        </div>

        <div className="input-group my-3">
          <span className="input-group-text" id="desc">
            Description
          </span>
          <textarea
            name="description"
            id="description"
            className="form-control"
            aria-label="With textarea"
            placeholder="Write description here ..."
            value={note.description}
            onChange={onChange}
          ></textarea>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="tag">
            Tag
          </span>
          <input
            name="tag"
            type="text"
            value={note.tag}
            className="form-control"
            placeholder="Genre"
            aria-label="Tag"
            aria-describedby="basic-addon1"
            onChange={onChange}
            id="tag"
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-dark"
          onClick={handleClick}
          style={{ width: "10%", cursor:"pointer" }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNote;
