import { Component } from "react";
import { API_CONFIG } from "../ProductRoute&APIs/apiConfig";

const ApiRegLink = API_CONFIG.UserRegLink

class ForgotPassword extends Component {
    state = {
      otp: '', // Array to hold OTP digits
        email:'',
        errorMsg: '',
        iserror:false,
        isemailvalid: true
    }


    handleChangeemail = (e) => {
      this.setState({email:e.target.value})
    }

    onSubmitEmail = async(e) => {
      e.preventDefault()
      const {email} = this.state
      this.setState({errorMsg: '', iserror:false})
      const url = `${ApiRegLink}reset-password-request`
      const option = {
        method: 'POST',
        headers : { 'Content-Type' : 'application/json',},
        body : JSON.stringify({ 
          email
        }),
      }
      try{
        const response = await fetch(url,option);
        const data = await response.json();
        if(response.ok){
          alert("OTP Send to Your Email")
          this.setState({isemailvalid:true})
        }
        else{
          this.setState({errorMsg: data.error, iserror:true})
        }
      }
      catch(error){
        alert(error)
      }
    }


    handleInputChange = (e, index) => {
      const value = e.target.value;
      if (value.length <= 1) {
        this.setState({ otp: this.state.otp.slice(0, index) + value + this.state.otp.slice(index + 1) });
        if (value) {
          const nextId = index < 5 ? `otp-${index + 1}` : null;
          if (nextId) {
            document.getElementById(nextId).focus();
          }
        }
      }
    };

  render() {
    const {iserror,otp,isemailvalid,errorMsg,email} = this.state
    console.log(otp)
    return (
      <div className="min-h-screen flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <form onSubmit={this.onSubmitEmail} className={`${isemailvalid ? "hidden" : ""} w-full max-w-md p-8 text-gray-200 bg-gray-800 rounded-lg`}>
          <p className="text-xl font-bold w-full text-center">Enter your Email id</p>
          <div className="mt-4">
            <input
              className="text-gray-200 bg-gray-900 border rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              type="email"
              required
              placeholder="Email id"
              value={email}
              onChange={this.handleChangeemail}
            />
          </div>
          {iserror ? <h3 className="text-red-600 font-bold mt-2">!{errorMsg}</h3> : ''}
          <div className="mt-8">
            <button type="submit" className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
              Next 
            </button>
          </div>
        </form>

        <div className="max-w-sm mx-auto">
        <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <input
                id={`otp-${index}`}
                type="number"
                maxLength="1"
                inputMode="numeric"
                className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={this.state.otp[index] || ''}
                onChange={(e) => this.handleInputChange(e, index)}
              />
            </div>
          ))}
        </div>
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please enter the 6-digit OTP sent via email.
        </p>
        <button
          onClick={this.handleSubmit}
          className="mt-4 bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Verify OTP
        </button>
      </div>


    </div>

    );
  }
}

export default ForgotPassword;
