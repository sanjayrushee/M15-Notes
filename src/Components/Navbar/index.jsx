import {Link, withRouter} from 'react-router-dom'
import { IoArchiveOutline } from "react-icons/io5";
import { MdOutlineLightbulb } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Component } from "react";
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';

const Token = Cookies.get('jwtToken');

class  Navbar extends Component {

    state = {
      isSidebarVisible: false,
      name: '',

    }

    componentDidMount(){
      this.getusername()
    }


    getusername = () =>{
      const decodedToken = jwtDecode(Token);
      const {email} = decodedToken;
      this.setState({name:email})
      console.log(decodedToken)
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
  render(){
    const { isSidebarVisible,name } = this.state;

    return(
  <>
   <div className='flex justify-between sm:justify-end '>
      <button
            onClick={this.toggleSidebar} 
            type="button"
            className=" text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <nav className=' sm:ml-64 text-xl p-2 mr-2 sm:mr-8 mt-2 ms-3'>
            <p>Hello {name}</p>
          </nav>
         </div>
          
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
                    <span className="hidden inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
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
         
  </>
    )
  }
}

export default withRouter(Navbar);
