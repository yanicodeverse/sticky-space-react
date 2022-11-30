import React, { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import { VscClose } from "react-icons/vsc";
import noteReducer from "./noteReducer";

const noteState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

function App() {
  const [noteInput, setNoteInput] = useState("");
  const [states, dispatch] = useReducer(noteReducer, noteState);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!noteInput) {
      return;
    }
    const newNote = {
      id: uuid(),
      text: noteInput,
      rotate: Math.floor(Math.random() * 20),
    };
    dispatch({ type: "ADD_ITEM", payload: newNote });
    setNoteInput("");
  };

  const dropNote = (event) => {
    event.target.style.left = `${event.pageX - 50}px`;
    event.target.style.top = `${event.pageY - 50}px`;
  };

  const dragOver = (event) => {
    event.setPropagation();
    event.preventDefault();
  };

  return (
    <div className="app" onDragOver={dragOver}>
      <h1>
        Sticky Space({states.totalNotes})
        <span>
          {states.totalNotes > 0
            ? `Last note created ${states.lastNoteCreated}`
            : ""}
        </span>
      </h1>
      <form className="note-form" onSubmit={handleSubmit}>
        <textarea
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Create A New Note ;)"
        ></textarea>
        <button type="submit">Add note</button>
      </form>
      {states.notes.map((note) => {
        return (
          <div
            className="note"
            style={{ transform: `rotate(${note.rotate}deg)` }}
            draggable="true"
            onDragEnd={dropNote}
            key={note.id}
          >
            <div
              className="close"
              onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}
            >
              <VscClose />
            </div>
            <pre className="text">{note.text}</pre>
          </div>
        );
      })}
    </div>
  );
}

export default App;
