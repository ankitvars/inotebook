import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = ({ note, updateNote, showAlert}) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">
            {note.title}
          </h5>
          <span className="badge badge-primary" style={{ backgroundColor: "gray", color: "white", marginRight:"10px", marginBottom:"5px" }}>{note.tag}</span>

          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deleteNote(note._id);
              showAlert("Note Deleted Successfully!","success");
            }}
          ></i>
          <i
            className="fa-regular fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          ></i>
          {/* <a href="/" className="btn btn-primary">
            View More
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
