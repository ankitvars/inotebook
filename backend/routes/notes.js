const express = require("express");
const fetchuser = require("../middlewares/fetchUser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1:Getting all notes details using GET method "/api/notes/fetchnotes". Login required.
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // catching errors
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});
//ROUTE 2:Adding a note using POST method "/api/notes/addnote". Login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors then returning the bad request and the errors that are occuring
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = await new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      // catching errors
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//ROUTE 3 :Updating a note using PUT method "/api/notes/updatenote". Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4 :Deleting a note using DELETE method "/api/notes/deletenote". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Finding the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note deletion success!", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
