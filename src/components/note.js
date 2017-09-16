import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import Draggable from 'react-draggable';
import marked from 'marked';
// import * as firebasedb from '../firebasedb';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      text: props.text,
      x: props.x,
      y: props.y,
      noteId: props.noteId,
      key: props.noteId,
      zIndex: props.zIndex,
      isEditing: props.isEditing,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
  }
  onStartDrag(e, ui) {
    this.setState({ x: ui.x });
    this.setState({ y: ui.y });
  }
  onDrag(e, ui) {
    this.setState({ x: ui.x });
    this.setState({ y: ui.y });
  }
  onStopDrag(e, ui) {
    this.setState({ x: ui.x });
    this.setState({ y: ui.y });
  }
  onChangeText(event) {
    this.setState({ text: event.target.value });
  }
  renderText() {
    if (this.state.isEditing) {
      return (
        <div>
          <Textarea value={this.state.text} onChange={this.onChangeText} />
        </div>
      );
    } else {
      return (
        console.log("setting markdown");
        <div dangerouslySetInnerHTML={{ __html: marked(this.state.text || '') }} />
      );
    }
  }
  renderTitle() {
    return (
      <p>{this.state.title}</p>
    );
  }
  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[5, 5]}
        defaultPosition={{ x: 300, y: 300 }}
        position={{ x: this.state.x, y: this.state.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >


        <div className="note_container">
          <div className="note_title_container">
            {this.renderTitle()}
            <div>
              <button onClick={() => {
                this.props.onDelete(this.state.noteId);
              }}
              >
                <i className="fa fa-trash-o" />
              </button>
              <button onClick={() => {
                if (this.state.isEditing) {
                  this.setState({ isEditing: false });
                } else {
                  this.setState({ isEditing: true });
                }
              }}
              >
                <i className="fa fa-pencil-square-o" />
              </button>
              <button className="note-mover">
                <i className="fa fa-arrows-alt" />
              </button>
            </div>
          </div>
          {this.renderText()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
