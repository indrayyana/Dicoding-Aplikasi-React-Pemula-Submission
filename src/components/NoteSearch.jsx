import React from "react";

function NoteSearch({ keyword, onSearchChange }) {
  return (
    <div className="note-search">
      <input type="text" placeholder="Cari catatan ..." value={keyword} onChange={onSearchChange} />
    </div>
  );
}

export default NoteSearch;
