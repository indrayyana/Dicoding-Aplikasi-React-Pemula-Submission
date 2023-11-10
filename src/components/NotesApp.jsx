import React from "react";
import { getInitialData } from "../utils";
import NotesList from "./NotesList";
import NoteInput from "./NoteInput";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState(
      (prevState) => {
        return {
          notes: [
            ...prevState.notes,
            {
              id: +new Date(),
              title,
              body,
              createdAt: new Date(),
              archived: false,
            },
          ],
        };
      },
      () => {
        alert("Catatan berhasil ditambahkan!");
      }
    );
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  render() {
    return (
      <>
        <div className="note-app__header">
          <h1>Notes</h1>
        </div>
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Catatan Aktif</h2>
          <NotesList notes={this.state.notes} onDelete={this.onDeleteHandler} />
          <h2>Arsip</h2>
        </div>
      </>
    );
  }
}

export default NotesApp;
