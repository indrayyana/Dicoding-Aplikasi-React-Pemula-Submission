import React from "react";
import { getInitialData } from "../utils";
import NotesList from "./NotesList";
import NoteInput from "./NoteInput";
import NoteSearch from "./NoteSearch";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchKeyword: "",
    };
  }

  onAddNoteHandler = ({ title, body }) => {
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
          title: "",
          body: "",
        };
      },
      () => {
        alert("Catatan berhasil ditambahkan!");
      }
    );
  };

  onDeleteHandler = (id) => {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  };

  onArchiveHandler = (id) => {
    const updateNotes = this.state.notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    this.setState({ notes: updateNotes });
  };

  onSearchChangeHandler = (event) => {
    this.setState(() => {
      return {
        searchKeyword: event.target.value,
      };
    });
  };

  render() {
    const filteredNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase())
    );

    const activeNotes = filteredNotes.filter((note) => !note.archived);
    const archivedNotes = filteredNotes.filter((note) => note.archived);

    return (
      <>
        <div className="note-app__header">
          <h1>Notes</h1>
          <NoteSearch keyword={this.state.searchKeyword} onSearchChange={this.onSearchChangeHandler} />
        </div>
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Catatan Aktif</h2>
          {activeNotes.length === 0 ? (
            <p className="notes-list__empty-message">Tidak ada catatan</p>
          ) : (
            <NotesList
              notes={filteredNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
          )}

          <h2>Arsip</h2>
          {archivedNotes.length === 0 ? (
            <p className="notes-list__empty-message">Tidak ada catatan</p>
          ) : (
            <NotesList
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
          )}
        </div>
      </>
    );
  }
}

export default NotesApp;
