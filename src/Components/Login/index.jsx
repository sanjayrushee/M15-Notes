import { Component } from "react";
import {Link} from 'react-router-dom'
import { API_CONFIG } from '../ProductRoute&APIs/apiConfig'
import Cookies from 'js-cookie'

const Api_link_login = API_CONFIG.UserRegLink

class Login extends Component{

  state = {
    email: '',
    password: '',
    isloading: false,
    iserror: false,
    errorMsg: ''
  }

  onSubmitSuccess = jsToken => {
    const {history} = this.props
    Cookies.set('jwtToken', jsToken, { 
      sameSite: 'None', 
      secure: true 
    });
    history.replace("/")
  }
  
  onSubmitFail = error => {
    console.log(error)
    this.setState({iserror: true, errorMsg:error})

  }

  onSubmitFunction = async (event) => {
    event.preventDefault()
    this.setState({isloading: true})
    const { email, password } = this.state;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ 
        email,
        password
      }),
    };

    try {
      const response = await fetch(`${Api_link_login}/login`, options);
      const data = await response.json();

      if (response.ok) {
        this.onSubmitSuccess(data.jwtToken)
        this.setState({isloading: false})
      } else {
        this.onSubmitFail(data.error)
        this.setState({isloading: false})
      }
    } catch (error) {
      console.error('Error:', error);
      this.setState({isloading: false})

    }
  }



  handleChangeemail = (event) => {
    this.setState({email: event.target.value})
  }

  handleChangepassword = (event) => {
    this.setState({password: event.target.value})
  }

  loadingbtn = () => (
    <button disabled="" type="button" className="bg-blue-700  text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-700  text-sm  text-center mr-2 dark:bg-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center items-center">
    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 font-bold text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
    </svg>
    Loading...
  </button>
  )
    
  render() {
    const { email, password, isloading, iserror, errorMsg } = this.state
             return(
              <div className="flex items-center justify-center min-h-screen w-full px-5 sm:px-0">
                <div className="flex  items-center bg-gray-900  rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
                  <div
                    className="hidden lg:block lg:w-3/4  bg-blue-600 "
                   >
                     <img src="\computer_login.png" alt=""  />
                  </div>
                  <form onSubmit={this.onSubmitFunction} className="w-full p-8  text-gray-200  lg:w-1/2">
                     <p className="text-xl font-bold text-center p-4">Welcome back!</p>
                    <div className="mt-4">
                      <label className="block text-sm font-bold mb-2">
                        Email Address
                      </label>
                  
                      <input
                        className="text-gray-200 bg-gray-900 border rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                        type="email"
                        required
                        value={email}
                        onChange={this.handleChangeemail}

                      />
                    </div>
                    <div className="mt-4 pb-4 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <label className="block text-sm font-bold mb-2">
                          Password
                        </label>
                      </div>
                      <input
                        className="text-gray-200 bg-gray-900 border rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                        type="password"
                        required
                        value={password}
                        onChange={this.handleChangepassword}
                      />
                     </div>
                     <div className="text-end">
                     <Link to="/pswforgot">
                        <span className="text-end text-blue-600 text-sm font-medium">Forgot password</span>
                        </Link>
                     </div>

                    
                     { iserror ?
                     <h3 className="text-red-600 font-bold">* {errorMsg}</h3> : ' ' }
                     <div className="mt-8">
                    
                       {isloading ? this.loadingbtn() :
                      <button  type="submit" className=" bg-blue-700  text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 transition ease-in-out delay-75  hover:-translate-z-1 hover:scale-110  duration-75">
                        Login
                       </button> 
                        }
                        
                    </div>
                    <div className="mt-4 text-sm flex items-center w-full text-center">
                      <p
                        className="text-xs text-gray-200 capitalize text-center w-full"
                      >
                        Don&apos;t have any account yet?
                        <Link to="/signup">
                        <span className="text-blue-600 font-bold"> Sign Up</span>
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
        
        )
    }
}
export default Login;