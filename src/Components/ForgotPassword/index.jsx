import { Component } from "react";

class ForgotPassword extends Component {

 
    state = {
        otp: '',
        iserror:'',
        email:'',
        errorMsg
    }


  handleOtpSubmit = async (event) => {
    event.preventDefault();

    const {emai} = this.state
    try {
      const response = await axios.post('/api/verify-otp', { otp: this.state.otp });
      if (response.data.success) {
        this.props.setOtpVerified(true);
        this.props.history.push('/reset-password');
      } else {
        this.setState({ error: 'Invalid OTP. Please try again.' });
      }
    } catch (err) {
      this.setState({ error: 'An error occurred. Please try again.' });
    }
  };

  render() {
    return (
      <div className=" min-h-screen flex items-center justify-center  w-full px-5 sm:px-0">
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
                    
                     { iserror ?
                     <h3 className="text-red-600 font-bold">* {errorMsg}</h3> : ' ' }
                    
                     <div className="mt-8">
                      <button  type="submit" className=" bg-blue-700  text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 transition ease-in-out delay-75  hover:-translate-z-1 hover:scale-110  duration-75">
                        Login
                       </button> 
                    </div>
    
                  </form>
                
      </div>
    );
  }
}

export default ForgotPassword;
