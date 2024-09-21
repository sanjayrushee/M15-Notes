import { Component } from "react";
import { MdAddBox } from "react-icons/md";
import Navbar from "../Navbar";
import { API_CONFIG } from '../ProductRoute&APIs/apiConfig';
import Cookies from 'js-cookie';

const addnoteslink = API_CONFIG.addnotes;
const fetchNotesLink = API_CONFIG.fetchNotesLink;
const Token = Cookies.get('jwtToken');

class Home extends Component {
  state = {
    isFormVisible: false,
    text: '',
    title: '',
    rows: 3,
    notes: [],
    editingNote: null, // Track which note is being edited
  };

  componentDidMount() {
    this.fetchNotes();
  }

  deleteNote = async (noteId) => {
    console.log(noteId)
    const options = {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${Token}`,
      },
    };

    try {
      const response = await fetch(`${fetchNotesLink}/${noteId}`, options);
      console.log(response)
      if (!response.ok) {
        const errorText = await response.json();
        console.log(errorText)
        throw new Error(errorText || 'Error deleting note');
      }
      this.fetchNotes(); // Refresh notes after deletion
    } catch (error) {
      console.error('Error deleting note:', error);
      alert(error);
    }
  };

  archiveNote = async (noteId) => {
    const options = {
      method: 'PUT', // Assuming PUT is used to update note status
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
      },
      body: JSON.stringify({ archived: true }), // Example payload for archiving
    };

    try {
      const response = await fetch(`${addnoteslink}/${noteId}`, options);
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText || 'Error archiving note');
      }
      this.fetchNotes(); // Refresh notes after archiving
    } catch (error) {
      console.error('Error archiving note:', error);
      alert(error);
    }
  };

  handleKeyDownTitle = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.textareaRef.focus();
    }
  };

  handleButtonClick = () => {
    this.setState({ isFormVisible: true, editingNote: null, title: '', text: '' }); // Reset form for new note
  };

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  onChangeText = (e) => {
    this.setState({ text: e.target.value });
  };

  autoResize = (event) => {
    const target = event.target;
    target.style.height = 'auto';
    const maxRows = 10;
    const lineHeight = parseInt(window.getComputedStyle(target).lineHeight, 10);
    const maxHeight = maxRows * lineHeight;
    target.style.height = `${Math.min(target.scrollHeight, maxHeight)}px`;
  };

  onSubmitNotes = async (event) => {
    event.preventDefault();
    const { title, text, editingNote } = this.state;
    const options = {
      method: editingNote ? 'PUT' : 'POST', // Use PUT if editing an existing note
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
      },
      body: JSON.stringify({
        title,
        description: text,
      }),
    };

    try {
      const url = editingNote ? `${fetchNotesLink}/${editingNote._id}` : addnoteslink; // Adjust URL for PUT request
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      this.fetchNotes(); // Fetch notes again to update the list
      this.setState({ isFormVisible: false, editingNote: null }); // Reset form
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

  fetchNotes = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Token}`,
      },
    };

    try {
      const response = await fetch(fetchNotesLink, options);
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText || 'Error fetching notes');
      }
      const notes = await response.json();
      this.setState({ notes });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Function to start editing a note
  startEditing = (note) => {
    this.setState({ isFormVisible: true, editingNote: note, title: note.title, text: note.description });
  };

  closeForm = () => {
    this.setState({ isFormVisible: false, editingNote: null, title: '', text: '' }); // Reset form
  };

  render() {
    const { isFormVisible, notes, title, text } = this.state;
    console.log(notes)
    return (
      <>
        <Navbar />
        <nav className="bg-blue-800">
          <p>Navigation Bar</p>
        </nav>
        <div className="relative min-h-screen sm:ml-72 sm:mt-3 inset-0">
          <div className="mb-4 flex justify-start">
            <button
              className="bg-blue-700 flex"
              type="button"
              onClick={this.handleButtonClick}
            >
              <MdAddBox /> <span>Add Note</span>
            </button>
          </div>
          {isFormVisible && (
            <>
              <div className="fixed inset-0 bg-black opacity-50 z-10" />
              <div className="absolute h-auto inset-0 flex items-start justify-center z-20">
                <div className="w-full max-w-md p-4 bg-white border shadow-md rounded-md">
                  <form onSubmit={this.onSubmitNotes} className="flex flex-col space-y-3">
                    <input
                      className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-yellow-500 text-gray-700 text-lg placeholder-gray-500"
                      placeholder="Title"
                      type="text"
                      value={title}
                      onChange={this.onChangeTitle}
                      onKeyDown={this.handleKeyDownTitle}
                    />
                    <textarea
                      className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-yellow-500 text-gray-700 placeholder-gray-500 resize-none"
                      placeholder="Take a note..."
                      rows={this.state.rows}
                      value={text}
                      onInput={this.autoResize}
                      onChange={this.onChangeText}
                      ref={(ref) => { this.textareaRef = ref; }}
                    />
                    <div className="flex h-auto justify-between">
                      <button
                        type="submit"
                        className="text-yellow-600 hover:bg-yellow-100 rounded px-4 py-1 focus:outline-none"
                      >
                        {this.state.editingNote ? 'Update' : 'Submit'}
                      </button>
                      {this.state.editingNote && (
                        <button
                          type="button"
                          className="text-red-400 hover:text-red-300 rounded px-4 py-1 focus:outline-none"
                          onClick={() => this.deleteNote(this.state.editingNote._id)} // Call deleteNote for the editing note
                        >
                          Delete
                        </button>
                      )}
                      <button
                        type="button"
                        className="text-gray-600 hover:text-gray-500 rounded px-4 py-1 focus:outline-none"
                        onClick={this.closeForm} // Close the form without saving
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
          <div className="columns-2 md:columns-4 gap-4">
            {notes.slice().reverse().map((note, index) => (
              <div
                className="group break-inside-avoid border border-gray-700 rounded-lg p-4 shadow-sm bg-gray-900 text-white mb-4 cursor-pointer"
                key={index}
                onClick={() => this.startEditing(note)} // Start editing when clicked
              >
                <h2 className="text-lg font-bold mb-2">{note.title}</h2>
                <p className="text-gray-400 mb-4 overflow-hidden text-ellipsis">{note.description}</p>
                <div className="flex justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering startEditing when clicking delete
                      this.deleteNote(note._id);
                    }}
                    className="text-red-400 hover:text-red-300" 
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering startEditing when clicking archive
                      this.archiveNote(note._id);
                    }}
                    className="text-blue-400 hover:text-blue-300" 
                    type="button"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
