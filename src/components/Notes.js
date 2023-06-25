/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { notes, fetchAll, editNote } = context;
  const navigate = useNavigate();

  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAll();
    } else {
      navigate("/login");
    }
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    if (ref.current) {
      ref.current.click();
      setNote({
        id: currentNote._id,
        etitle: currentNote.title,
        edescription: currentNote.description,
        etag: currentNote.tag,
      });
      console.log("This is updated note",note);
    }
  };

  const handleClick = (e) => {
    editNote(note.id, note.edescription, note.etitle, note.etag);
    refClose.current.click();
    showAlert("Updated successfully", "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert} />

      {/* <button
        type="button"
        className="btn btn-primary mx-3 my-2"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button> */}

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form className="my-3 mx-3">
              <div className="input-group mb-3">
                <span className="input-group-text">
                  Title
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  minLength={5}
                  placeholder="Title..."
                  required
                />
              </div>

              <div className="input-group my-3">
                <span className="input-group-text">
                  Description
                </span>
                <textarea
                  type="text"
                  className="form-control"
                  name="edescription"
                  id="edescription"
                  value={note.edescription}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  minLength={5}
                  required
                  aria-label="With textarea"
                  placeholder="Write description here ..."
                ></textarea>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  Tag
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                />
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginLeft: "10px" }}>
        <h1 style={{ marginBottom: "-20px" }}>Your Notes </h1>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
