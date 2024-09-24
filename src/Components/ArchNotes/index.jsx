import { Component } from "react";
import Navbar from "../Navbar";
import { API_CONFIG } from "../ProductRoute&APIs/apiConfig";
import Cookies from "js-cookie";

const noteslink = API_CONFIG.NotesLink;
const Token = Cookies.get('jwtToken');

class ArchNotes extends Component {
  state = {
    archnotes: [],
  };

  componentDidMount() {
    this.getarchnotes();
  }

  // Fetch archived notes
  getarchnotes = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    try {
      const response = await fetch(`${noteslink}archnotes`, options);
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText || "Error fetching notes");
      }
      const archnotes = await response.json();
      this.setState({ archnotes });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Delete note from archive
  deleteNote = async (noteId) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    try {
      const response = await fetch(`${noteslink}archive/${noteId}`, options); // Fixed URL
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText || "Error deleting note");
      }
      this.setState(prevState => ({
        archnotes: prevState.archnotes.filter(note => note._id !== noteId)
      }));
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Some error occurred");
    }
  };

  // Recover deleted notes from archive
  recoverdelnotes = async (noteId) => {
    const options = {
      method: "PUT", // Fixed HTTP method
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    try {
      const response = await fetch(`${noteslink}archive-recover/${noteId}`, options); // Fixed URL
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText || "Error recovering note");
      }
      // Remove the recovered note from the state without refetching
      this.setState(prevState => ({
        archnotes: prevState.archnotes.filter(note => note._id !== noteId)
      }));
    } catch (error) {
      console.error("Error recovering note:", error);
      alert("Some error occurred");
    }
  };

  render() {
    const { archnotes } = this.state;

    return (
      <>
        <Navbar />
        <div className="relative min-h-fit mx-3 my-3 sm:ml-72 sm:mt-3 inset-0">
          <div className="columns-2 md:columns-4 gap-4">
            {archnotes.slice().reverse().map((note, index) => (
              <div
                className="group break-inside-avoid border border-gray-700 rounded-lg p-4 shadow-sm bg-gray-900 text-white mb-4 cursor-pointer"
                key={index}
              >
                <h2 className="text-lg font-bold mb-2 overflow-hidden text-ellipsis">
                  {note.title}
                </h2>
                <p className="text-gray-400 mb-4 overflow-hidden text-ellipsis">
                  {note.description}
                </p>
                <div className="flex justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      this.deleteNote(note._id); // Deleting note
                    }}
                    className="text-red-400 hover:text-red-300"
                    type="button"
                  >
                    Delete
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      this.recoverdelnotes(note._id); // Recovering note
                    }}
                    className="text-blue-400 hover:text-blue-300"
                    type="button"
                  >
                    Recover
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

export default ArchNotes;
