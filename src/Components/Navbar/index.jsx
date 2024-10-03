import { Link, withRouter } from 'react-router-dom';
import { IoArchiveOutline } from 'react-icons/io5';
import { MdOutlineLightbulb, MdDeleteOutline } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Component } from 'react';
import Cookies from 'js-cookie';
import './index.css'

const storedUsername = localStorage.getItem('username');

class Navbar extends Component {
  state = {
    isSidebarVisible: false,
  };

  toggleSidebar = () => {
    this.setState({ isSidebarVisible: !this.state.isSidebarVisible });
  };

  closeSidebar = () => {
    this.setState({ isSidebarVisible: false });
  };

  onClickLogout = () => {
    Cookies.remove('jwtToken');
    localStorage.clear(); 
    const { history } = this.props;
    history.replace('/login');
    window.location.reload(); 
  };
  

  render() {
    const { isSidebarVisible } = this.state;
    return (
      <>
        {/* Top Navbar with Hamburger Menu */}
        <div className="bg-blue-700 border rounded-xl w-full md:w-4/5 flex justify-center mb-7 hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <button
            type="button"
            onClick={this.onClickLogout}
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white"
          >
            <CiLogout className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
          </button>
        </div>


        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 min-h-screen transition-transform transform ${
            isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}  // Removed `hidden lg:block`
          aria-label="Sidebar"
        >
          <div className="min-h-screen px-3 py-4 flex flex-col justify-between overflow-y-auto bg-gray-50 dark:bg-gray-800 relative">
          <ul className="space-y-2 font-medium md:mt-7">
            <li>
              <img src="m15.png" alt="m15logo" className="m15logo w-24" />
            </li>

            {/* Close Button for Mobile Sidebar */}
            <li className="absolute top-0 right-0 py-2 pr-5 md:hidden">
              <button
                onClick={this.closeSidebar}
                className="text-gray-500 dark:text-gray-400 hover:text-red-600"
              >
                <IoCloseCircleOutline className="w-6 h-6" />
              </button>
            </li>

            {/* Sidebar Links */}
            <Link to="/">
              <li className="mt-3 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <MdOutlineLightbulb
                  size={25}
                  className="flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="ml-3 text-lg font-bold">Notes</span>
              </li>
            </Link>
            <Link to="/archnotes">
              <li className="mt-3 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IoArchiveOutline
                  size={25}
                  className="flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="ml-3 text-lg font-bold">Archived</span>
              </li>
            </Link>
            <Link to="/delnotes">
              <li className="mt-3 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <MdDeleteOutline
                  size={25}
                  className="flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="ml-3 text-lg font-bold">Delete</span>
              </li>
            </Link>
          </ul>
  {/* Logout Button */}
          <div className="bg-blue-700 border rounded-xl w-4/5 flex justify-center mb-7 mx-4 hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <button
              type="button"
              onClick={this.onClickLogout}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white"
            >
              <CiLogout className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
            </button>
          </div>
          </div>
        </aside>
      </>
    );
  }
}

export default withRouter(Navbar);
