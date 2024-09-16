import { Component } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { API_CONFIG } from '../ProductRoute&APIs/apiConfig'
import { RingLoader  } from 'react-spinners';

const signup_api = API_CONFIG.RegUrl

class Signup extends Component{
  state = {
    ispasswordVisible: true,
    isrepasswordVisible:true,
    username:"",
    email:"",
    password: "",
    Repassword: "",
    isloading: false,
    iserror: false,
    erroMsg: ''
  }

  ispassword = () =>{
    this.setState((prevState) =>({
      ispasswordVisible: !prevState.ispasswordVisible
    }))
  }

  isrepassword = () =>{
    this.setState((prevState) =>({
      isrepasswordVisible: !prevState.isrepasswordVisible
    }))
  }

  onchangeEmail = (event) => {
    this.setState({email: event.target.value})
  }

  onchangeName = (event) => {
    this.setState({username: event.target.value})
  }

  onchangepassword = (event) => {
    this.setState({password: event.target.value})
  }

  onchangeRepassword = (event) => {
    this.setState({Repassword: event.target.value})
  }

  onSubmitFail = error => {
    this.setState({iserror: true, errorMsg:error})

  }


  onSubmitForm =  async(event) =>{
    event.preventDefault()
    const {username,password,Repassword,email} = this.state 
    if (Repassword != password) {
      this.setState({ iserror: true, erroMsg:"Please check the password again."})
      return
    }

    this.setState({isloading: true})

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        email:email,
        username:username,
        password:password
      }),
    };

    try{
      const response = await fetch(signup_api,options);
      const data = await response.json();
      if(response.ok){
        alert(`${data.message}. Redirecting to login page.`);
        this.setState({
          email: '',
          username: '',
          password: ''
        });
        const {history} = this.props
        history.replace("/login")
      }
      else {
        this.onSubmitFail(data.error)
      }

    }
    catch(error){
      console.error(error)
    }
    this.setState({isloading: false})

  }

  render() {
    const { iserror, isloading, erroMsg } = this.state
    console.log(iserror,erroMsg)
    return(
      <div className="font-[sans-serif]  max-w-4xl flex items-center mx-auto md:min-h-screen p-4">
        <div className="relative grid bg-gray-900  text-gray-200 md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <div className={`${isloading ? 'flex' : 'hidden'}  absolute inset-0 z-30 bg-gray-900 bg-opacity-80   items-center justify-center`} >
        <RingLoader color="#00abff" />
        </div>
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">M15 Notes</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Let your notes be the pathway to your dream. where ideas are nurtured, clarity is achieved, and the full potential of your creativity is realized.</p>
          </div>
        </div>
        <form  autocomplete="off" onSubmit={this.onSubmitForm}  className="md:col-span-2 bg-gray-900 text-gray-200 w-full py-6 px-6  sm:px-16">
          <div className="mb-6">
            <h3 className=" text-2xl font-bold">Create an account</h3>
          </div>
          <div  className="space-y-6">
          <div>
            <label className=" text-sm mb-2 block">Name</label>
            <div className="relative flex items-center">
              <input 
                name="name" 
                type="text" 
                onChange={this.onchangeName}
                required 
                className=" border bg-gray-900 border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" 
                placeholder="Enter name" 
              />
            </div>
          </div>

          <div>
            <label className=" text-sm mb-2 block">Email Id</label>
            <div className="relative flex items-center ">
              <input 
                name="email" 
                type="email" 
                onChange={this.onchangeEmail} 
                required 
                className="border bg-gray-900 border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" 
                placeholder="Enter email" 
              />
            </div>
          </div>

          <div>
            <label className=" text-sm mb-2 block">Password</label>
            <div className="relative flex items-center">
              <input 
                name="password"
                onChange={this.onchangepassword}
                type={this.state.ispasswordVisible ? "password" :  "text"}
                required 
                className="border bg-gray-900 border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" 
                placeholder="Enter password" 
              />
              {this.state.ispasswordVisible ? (
                <BsFillEyeSlashFill 
                  onClick={this.ispassword} 
                  className="w-4 h-4 absolute right-4 cursor-pointer" 
                />
              ) : (
                <IoEyeSharp 
                  onClick={this.ispassword} 
                  className="w-4 h-4 absolute right-4 cursor-pointer" 
                />
              )}
            </div>
          </div>
              
          <div>
            <label className=" text-sm mb-2 block">Confirm password</label>
            <div className="relative flex items-center">
              <input 
                name="repassword"
                onChange={this.onchangeRepassword}
                type={this.state.isrepasswordVisible ? "password" :  "text"}
                required 
                className="border bg-gray-900 border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" 
                placeholder="Enter password" 
              />
              {this.state.isrepasswordVisible ? (
                <BsFillEyeSlashFill 
                  onClick={this.isrepassword} 
                  className="w-4 h-4 absolute right-4 cursor-pointer" 
                />
              ) : (
                <IoEyeSharp 
                  onClick={this.isrepassword} 
                  className="w-4 h-4 absolute right-4 cursor-pointer" 
                />
              )}
            </div>
                {iserror? <h3 className="mt-5 text-red-600 font-bold">* {erroMsg}</h3> : ""}
          </div>

          <div className="flex  items-center">
            <label className="ml-3 block text-sm ">
              By creating an account you agree to 
              <a 
              href="https://superb-sword-de5.notion.site/Terms-and-Conditions-09255999320245cfb2bd1efce41dec68"
                target="_blank" 
                rel="noreferrer" 
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Terms and Conditions
              </a>
                </label>
               </div>
                  </div>
                  <div className="!mt-6">
                    <button type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-blue-700 hover:bg-gray-800 focus:outline-none">
                      Create an account
                    </button>
                  </div>
                  <p className=" text-sm mt-6 text-center">Already have an account? <Link to="/login"><span className="text-blue-600 font-semibold hover:underline ml-1">Login here</span></Link></p>
                </form>
      </div>
      </div>
    )
    }
}

export default Signup;