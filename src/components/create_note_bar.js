import React, { Component } from 'react';


class CreateNoteBar extends Component {
  constructor(props) {
    super(props);
    this.state = { note_title: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ note_title: event.target.value });
  }

  render() {
    return (
      <div className="create_note_bar">
        <input className="full_width" placeholder="Enter Title" onChange={this.onInputChange} value={this.state.note_title} />
        <br />
        <button className="create_button" onClick={() => this.props.onCreate(this.state.note_title)}>Create!</button>
      </div>
    );
  }
}

export default CreateNoteBar;
