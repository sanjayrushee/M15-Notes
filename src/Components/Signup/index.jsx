import { Component } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsFillEyeSlashFill } from "react-icons/bs";

const signup_api = import.meta.env.VITE_SOME_KEY

class Signup extends Component{
  state = {
    ispasswordVisible: true,
    username:"",
    email:"",
    password:""
  }

  testing = () =>{
    this.setState((prevState) =>({
      ispasswordVisible: !prevState.ispasswordVisible
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

  onSubmitForm =  async(event) =>{
    event.preventDefault()
    console.log("hello")
    const {username,password,email} = this.state 

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
      else{
        alert(data.error)
      }

    }
    catch(error){
      console.error(error)
    }
   

  }

    render(){
    return(
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
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

        <form  onSubmit={this.onSubmitForm} className="md:col-span-2 w-full py-6 px-6 sm:px-16">
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
          </div>
          <div  className="space-y-6">
  <div>
    <label className="text-gray-800 text-sm mb-2 block">Name</label>
    <div className="relative flex items-center">
      <input 
        name="name" 
        type="text" 
        onChange={this.onchangeName}
        required 
        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" 
        placeholder="Enter name" 
      />
    </div>
  </div>

  <div>
    <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
    <div className="relative flex items-center">
      <input 
        name="email" 
        type="email" 
        onChange={this.onchangeEmail} 
        required 
        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" 
        placeholder="Enter email" 
      />
    </div>
  </div>

  <div>
    <label className="text-gray-800 text-sm mb-2 block">Password</label>
    <div className="relative flex items-center">
      <input 
        name="password"
        onChange={this.onchangepassword}
        type={this.state.ispasswordVisible ? "password" :  "text"}
        required 
        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" 
        placeholder="Enter password" 
      />
      {this.state.ispasswordVisible ? (
        <BsFillEyeSlashFill 
          onClick={this.testing} 
          className="w-4 h-4 absolute right-4 cursor-pointer" 
        />
      ) : (
        <IoEyeSharp 
          onClick={this.testing} 
          className="w-4 h-4 absolute right-4 cursor-pointer" 
        />
      )}
    </div>
  </div>

  <div className="flex items-center">
    <label className="ml-3 block text-sm text-gray-800">
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
          <div className="!mt-12">
            <button type="button  " className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
              Create an account
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link to="/login"><span className="text-blue-600 font-semibold hover:underline ml-1">Login here</span></Link></p>
        </form>
      </div>
    </div>
    )
    }
}

export default Signup;