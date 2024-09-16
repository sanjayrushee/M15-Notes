import { Component } from "react";
import { IoArchiveOutline } from "react-icons/io5";
import { MdOutlineLightbulb } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import Cookies from 'js-cookie'
import Navbar from "../Navbar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarVisible: false,
    };
  }

  toggleSidebar = () => {
    this.setState({ isSidebarVisible: !this.state.isSidebarVisible });
  };

  closeSidebar = () => {
    this.setState({ isSidebarVisible: false });
  };

   onClickLogout = () => {
    Cookies.remove('jwtToken')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const { isSidebarVisible } = this.state;

    return (
      <>
        <>
          <button
            onClick={this.toggleSidebar} 
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-64  min-h-screen transition-transform transform ${
              isSidebarVisible ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0`} 
            aria-label="Sidebar"    
          >
            <div className="min-h-screen px-3 py-4 flex flex-col justify-between overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul className="space-y-2 font-medium sm:mt-7">
                <li className="py-2 sm:hidden text-end">
                  <button onClick={this.closeSidebar} className="text-gray-500 dark:text-gray-400 hover:text-red-600 pl-7">
                    <IoCloseCircleOutline className="w-7 h-7" />
                  </button>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <MdOutlineLightbulb className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3">Notes</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <IoArchiveOutline className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Archived</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <MdDeleteOutline className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Delete</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                  </a>
                </li>
              </ul>
              <div className="bg-blue-700 border rounded-xl w-4/5 flex justify-center mb-7 mx-4 hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <button type="button" onClick={this.onClickLogout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white">
                  <CiLogout className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                </button>
              </div>
            </div>
          </aside>

          <div className="min-h-screen sm:ml-72 sm:mt-3  inset-0">
            <div className="flex justify-start mb-4">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                + Add
              </button>
            </div>
          </div>
        </>
      </>
    );
  }
}

export default Home;
