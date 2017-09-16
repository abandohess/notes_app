import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import Note from './components/note';
import NoteCreateBar from './components/create_note_bar';
import './style.scss';
import * as firebasedb from './firebasedb';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      silly: 0,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount() {
    firebasedb.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }
  onCreate(noteTitle) {
    const newNote = {
      title: noteTitle,
      text: '',
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      zIndex: this.state.notes.size + 1,
    };
    this.state.silly += 1;
    firebasedb.addNote(newNote);
  }
  onDelete(id) {
    this.state.silly += 1;
    firebasedb.removeNote(id);
  }

  render() {
    return (
      <div>
        <NoteCreateBar onSearchChange={text => this.search(text)} onCreate={this.onCreate} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note
              onDelete={this.onDelete}
              noteId={id}
              key={id}
              title={note.title}
              text={note.text}
              x={50}
              y={50}
              zIndex={100}
              isEditing={false}
            />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
