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
  };

  handleKeyDownTitle = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission
      this.textareaRef.focus(); // Move focus to the textarea
    }
  };

  componentDidMount() {
    this.fetchNotes();
  }

  handleButtonClick = () => {
    this.setState({ isFormVisible: true });
  };

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  onChangeText = (e) => {
    this.setState({ text: e.target.value });
  };

  autoResize = (event) => {
    const target = event.target;
    target.style.height = 'auto'; // Reset the height

    const maxRows = 10;
    const lineHeight = parseInt(window.getComputedStyle(target).lineHeight, 10);
    const maxHeight = maxRows * lineHeight;

    target.style.height = `${Math.min(target.scrollHeight, maxHeight)}px`; // Set height to scrollHeight or maxHeight
  };

  onSubmitNotes = async (event) => {
    event.preventDefault(); // Prevent default form submission
    this.setState({ isFormVisible: false });
    const { title, text } = this.state;

    const options = {
      method: 'POST',
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
      const response = await fetch(addnoteslink, options);
      const data = await response.text();
      console.log(data);
      this.fetchNotes(); // Fetch notes again to update the list
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
        const errorText = await response.text();
        throw new Error(errorText || 'Error fetching notes');
      }

      const notes = await response.json();
      this.setState({ notes });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  render() {
    const { isFormVisible, notes } = this.state;
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
                      onChange={this.onChangeTitle}
                      onKeyDown={this.handleKeyDownTitle}
                    />
                    <textarea
                      className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-yellow-500 text-gray-700 placeholder-gray-500 resize-none"
                      placeholder="Take a note..."
                      rows={this.state.rows}
                      onInput={this.autoResize}
                      onChange={this.onChangeText}
                      ref={(ref) => { this.textareaRef = ref; }} // Reference for the textarea
                    />
                    <div className="flex h-auto justify-end">
                      <button
                        type="submit"
                        className="text-yellow-600 hover:bg-yellow-100 rounded px-4 py-1 focus:outline-none"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
          <div className="flex flex-wrap">
            {notes.map((note, index) => (
              <div className="w-52 border-solid border border-gray-100 m-3" key={index}>
                <h2>{note.title}</h2>
                <p>{note.description}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
