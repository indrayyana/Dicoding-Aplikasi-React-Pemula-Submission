import React from "react";
import autoBind from "auto-bind";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      titleCharLimit: 50,
    };

    autoBind(this);
  }

  onTitleChangeEventHandler(event) {
    const inputTitle = event.target.value;

    if (inputTitle.length <= this.state.titleCharLimit) {
      this.setState(() => {
        return {
          title: inputTitle,
        };
      });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
    this.setState(() => {
      return {
        title: "",
        body: "",
      };
    });
  }

  render() {
    const remainingTitleChars = this.state.titleCharLimit - this.state.title.length;

    return (
      <div className="note-input">
        <h2>Buat catatan</h2>
        <form onSubmit={this.onSubmitEventHandler}>
          <p className="note-input__title__char-limit">Sisa karakter: {remainingTitleChars}</p>
          <input
            className="note-input__title"
            type="text"
            placeholder="ini adalah judul ..."
            required
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
          />
          <textarea
            className="note-input__body"
            type="text"
            placeholder="Tuliskan catatanmu di sini ..."
            required
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
          ></textarea>
          <button type="submit">Buat</button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
