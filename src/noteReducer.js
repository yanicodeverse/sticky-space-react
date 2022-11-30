const noteReducer = (prevState, action) => {
  if (action.type === "ADD_ITEM") {
    return {
      ...prevState,
      lastNoteCreated: new Date().toTimeString().slice(0, 8),
      totalNotes: prevState.notes.length + 1,
      notes: [...prevState.notes, action.payload],
    };
  }

  if (action.type === "DELETE_NOTE") {
    return {
      ...prevState,
      totalNotes: prevState.notes.length - 1,
      notes: prevState.notes.filter((note) => note.id !== action.payload.id),
    };
  }

  throw new Error("not matching action type");
};

export default noteReducer;
