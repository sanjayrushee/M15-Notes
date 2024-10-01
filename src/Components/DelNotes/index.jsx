import { Component } from "react";
import Navbar from "../Navbar";
import { API_CONFIG } from "../ProductRoute&APIs/apiConfig";
import Cookies from "js-cookie";

const noteslink = API_CONFIG.NotesLink
const Token = Cookies.get('jwtToken');

class DelNotes extends Component{

    state={
        delnotes: []
    }

    componentDidMount(){
        this.getdelnotes()
    }

    getdelnotes = async() =>{
        const options = {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${Token}`,
            },
          };
      
          try {
            const response = await fetch(`${noteslink}/delnotes`, options);
            if (!response.ok) {
              const errorText = await response.json();
              throw new Error(errorText || 'Error fetching notes');
            }
            const delnotes = await response.json();
            this.setState({ delnotes });
          } catch (error) {
            console.error('Error fetching notes:', error);
          } 
    }

    recoverdelnotes = async (noteId) => {
        const options = {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${Token}`,
          },
        };
    
        try {
          const response = await fetch(`${noteslink}/${noteId}/recover`, options);
          console.log(response)
          this.setState(prevState => ({
            delnotes: prevState.delnotes.filter(note => note._id !== noteId)
          }));
          if (!response.ok) {
            const errorText = await response.json();
            console.log(errorText)
            throw new Error(errorText || 'Error recover note');
          }
        } catch (error) {
          console.error('Error recover  note:', error);
          alert("some error occured");
        }
        this.getdelnotes() 
      };



    render(){
        const {delnotes} = this.state
        return(
            <>
            <Navbar />
            <div className="relative min-h-fit mx-3 my-3 sm:ml-72 sm:mt-3 inset-0">
              {delnotes.length === 0 ? (
                <div  className="flex justify-center items-center min-h-screen">
                  <img 
                  src="/Empty-amico.png" 
                  alt="No Notes" 
                  className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-2/6"
                />
                </div>
              ) : (
            <div className="columns-2 md:columns-4 gap-4">
                {delnotes.slice().reverse().map((note, index) => (
                  <div
                    className="group break-inside-avoid border border-gray-700 rounded-lg p-4 shadow-sm bg-gray-900 text-white mb-4 cursor-pointer"
                    key={index}
                    onClick={() => this.startEditing(note)}
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
                          this.recoverdelnotes(note._id);
                        }}
                        className="text-red-400 hover:text-red-300"
                        type="button"
                      >
                        Recover
                      </button>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </div>
            </>
        )
    }
}

export default DelNotes