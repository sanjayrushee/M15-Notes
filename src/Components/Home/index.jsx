import { Component } from "react";
import { MdAddBox } from "react-icons/md";
import Navbar from "../Navbar";
import { API_CONFIG } from '../ProductRoute&APIs/apiConfig';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Oval } from "react-loader-spinner";
import { MdDeleteOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { IoMdArchive } from "react-icons/io";



const noteslink = API_CONFIG.NotesLink;
const Token = Cookies.get('jwtToken');

class Home extends Component {
  state = {
    isFormVisible: false,
    text: '',
    title: '',
    rows: 10,
    notes: [],
    editingNote: null,
    name: '',
    isLoading: false,
  };
  async componentDidMount() {
    console.log("Component is mounting...");
    this.setState({ isLoading: true });

    try {
      await this.getUsername();
      await this.fetchNotes();
    } catch (error) {
      console.error("Error in componentDidMount:", error);
    } finally {
      this.setState({ isLoading: false });
      console.log("Loading finished. Current state:", this.state);
    }
  }

  getUsername = async () => {
    console.log("Fetching username...");
    const Token = Cookies.get('jwtToken');
    const decodedToken = await jwtDecode(Token);
    const { username } = decodedToken;
    this.setState({ name: username });
    localStorage.setItem('username', username);
  };

  fetchNotes = async () => {
    console.log("Fetching notes...");
    const noteslink = API_CONFIG.NotesLink;
    const Token = Cookies.get('jwtToken');
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Token}`,
      },
    };

    const response = await fetch(noteslink, options);
    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(errorText || 'Error fetching notes');
    }

    const notes = await response.json();
    console.log("Notes fetched:", notes);
    this.setState({ notes });
  };

  

  archiveNote = async (noteId) => {
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${Token}`,
      },
    };

    try {
      const response = await fetch(`${noteslink}/archive/${noteId}`, options);
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText || 'Error archiving note');
      }
      this.closeForm(); 
      this.setState(prevState => ({
        notes: prevState.notes.filter(note => note._id !== noteId),
      }));
    } catch (error) {
      console.error('Error archiving note:', error);
      alert("Some error occurred");
    }
  };

  deleteNote = async (noteId) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Token}`,
      },
    };

    try {
      const response = await fetch(`${noteslink}/${noteId}`, options);
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText || 'Error deleting note');
      }
      this.setState(prevState => ({
        notes: prevState.notes.filter(note => note._id !== noteId),
      }));
      this.closeForm(); 
    } catch (error) {
      console.error('Error deleting note:', error);
      alert("Some error occurred");
    }
  };

  closeForm = () => {
    this.setState({ isFormVisible: false, editingNote: null, title: '', text: '' }); // Reset form
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
    if (title === '' && text === '') {
      return alert("Enter title and text");
    }
    const options = {
      method: editingNote ? 'PUT' : 'POST',
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
      const url = editingNote ? `${noteslink}/${editingNote._id}` : noteslink; 
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText || 'Error saving note');
      }
      await this.fetchNotes(); 
      this.closeForm(); 
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

  startEditing = (note) => {
    this.setState({ isFormVisible: true, editingNote: note, title: note.title, text: note.description });
  };

  render() {
    const { isLoading, isFormVisible, notes, title, text } = this.state;
    return (
      <>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <Oval type="Puff" color="#00BFFF" height={50} width={50} />
          </div>
        )}
        <Navbar />
        <div className="relative min-h-fit mx-3 my-3 sm:ml-72 sm:mt-3 inset-0">
          <div className="mb-4">
            <button
              className="bg-blue-700 p-2 py-3 rounded-lg flex justify-center items-center"
              type="button"
              onClick={this.handleButtonClick}
            >
              <MdAddBox size={22} /> <span className="ml-2 mr-2 font-bold">Add Note</span>
            </button>
          </div>
          {isFormVisible && (
            <>
             <div className="fixed inset-0 bg-black opacity-50 z-10" />
            <div className="fixed inset-0 sm:left-40 flex items-center justify-center z-20">
              <div className="relative w-full max-w-xl p-4 bg-[#1B1B1B] text-[#F4FAF8] border shadow-md rounded-md mx-4 sm:mx-0">
                {/* Close Button positioned at the top-right corner */}
                <button
                  type="button"
                  className="absolute top-3  right-3 text-gray-600 hover:text-gray-500 rounded px-4 py-1 focus:outline-none z-30"
                  onClick={this.closeForm}
                >
                  <TiDeleteOutline size={30} color="#fff" />
                </button>

                <form onSubmit={this.onSubmitNotes} className="flex flex-col space-y-3">
                  <input
                    className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-yellow-500 text-lg placeholder-gray-500"
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={this.onChangeTitle}
                    onKeyDown={this.handleKeyDownTitle}
                  />
                  <textarea
                    className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-yellow-500 placeholder-gray-500 resize-none"
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
                      className="text-[#fff] hover:text-blue-700 rounded px-4 py-1 focus:outline-none"
                    >
                      {this.state.editingNote ? 'Update' : 'Submit'}
                    </button>
                    {this.state.editingNote && (
                      <div className="flex space-x-3">
                        {/* Delete Button */}
                        <button
                          type="button"
                          className=" hover:bg-red-900 rounded-full p-2 focus:outline-none transition duration-300 ease-in-out"
                          onClick={() => this.deleteNote(this.state.editingNote._id)}
                        >
                          <MdDeleteOutline size={30} color="#fff" />
                        </button>
                        {/* Archive Button */}
                        <button
                          type="button"
                          className=" hover:bg-yellow-900 rounded-full p-2 focus:outline-none transition duration-300 ease-in-out"
                          onClick={() => this.archiveNote(this.state.editingNote._id)}
                        >
                          <IoMdArchive size={30} color="#fff" />
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
            </>
          )}
          <div className="columns-2 md:columns-4 gap-4">
            {notes.slice().reverse().map((note, index) => (
              <div
                className="group relative overflow-hidden break-inside-avoid border border-gray-700 rounded-lg p-4 shadow-sm bg-gray-900 text-white mb-4 cursor-pointer"
                key={index}
                onClick={() => this.startEditing(note)}
              >
                <h2 className="text-lg font-bold mb-2 line-clamp-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {note.title}
                </h2>
                <p className="text-gray-400 mb-2 line-clamp-3">{note.description}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
