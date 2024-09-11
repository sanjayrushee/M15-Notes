import { Component } from "react";
import { IoArchiveOutline } from "react-icons/io5";
import { MdOutlineLightbulb } from "react-icons/md";
import { MdDeleteOutline  } from "react-icons/md";
import Navbar from "../Navbar";

class Home extends Component{
    render(){
        return(
            <>
            <Navbar />
            <div className="flex  flex-col min-h-screen fixed top-28">
            <div className="overflow-y-auto py-4 px-3">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <MdOutlineLightbulb />
                    <span className="ml-3">Notes</span>
                  </a>
                      </li>
                      <li>
                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <IoArchiveOutline />
                      <span className="ml-3">Archive</span>
                    </a>
                        </li>
                        <li>
                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MdDeleteOutline  />
                      <span className="ml-3">Delete</span>
                    </a>
                  </li>
                </ul>
                </div>
            </div>
            <div className="">
                <h2 className=" text-gray-300">hello this is home</h2>
            </div>
            </>
        )
    }
}

export default Home