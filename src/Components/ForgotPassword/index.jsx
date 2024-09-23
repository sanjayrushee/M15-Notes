import { Component } from "react";
import { API_CONFIG } from "../ProductRoute&APIs/apiConfig";
import {Oval} from "react-loader-spinner";

const ApiRegLink = API_CONFIG.UserRegLink;

class ForgotPassword extends Component {
  state = {
    otp: '', // Array to hold OTP digits
    email: '',
    password: '',
    confirmPassword: '',
    errorMsg: '',
    iserror: false,
    isemailvalid: false,
    isOTPVerified: false, // New state to track OTP verification
    otpbtndisable: false,
    emailbtndisable: false,
    isLoading: true
  };

  handleChangeemail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleChangePassword = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitEmail = async (e) => {
    e.preventDefault();
    this.setState({ emailbtndisable: true });
    const { email } = this.state;
    this.setState({ errorMsg: '', iserror: false });
    const url = `${ApiRegLink}reset-password-request`;
    const option = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    };
    try {
      const response = await fetch(url, option);
      const data = await response.json();
      if (response.ok) {
        alert('OTP Sent to Your Email');
        this.setState({ isemailvalid: true });
      } else {
        this.setState({ errorMsg: data.error, iserror: true });
      }
    } catch (error) {
      alert(error);
    }
    this.setState({ emailbtndisable: false });
  };

  handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      this.setState({
        otp: this.state.otp.slice(0, index) + value + this.state.otp.slice(index + 1),
      });
      if (value) {
        const nextId = index < 5 ? `otp-${index + 1}` : null;
        if (nextId) {
          document.getElementById(nextId).focus();
        }
      }
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { otp, email } = this.state;
    this.setState({ otpbtndisable: true });

    const url = `${ApiRegLink}/check-verification-code`;
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        verificationCode: otp,
      }),
    };
    try {
      const response = await fetch(url, option);
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        this.setState({ isOTPVerified: true });
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert(error);
    }
    this.setState({ otpbtndisable: false });
  };

  handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const url = `${ApiRegLink}/reset-password`;
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        newPassword: password,
      }),
    };

    try {
      const response = await fetch(url, option);
      const data = await response.json();
      if (response.ok) {
        this.setState({email:'',otp: '',password:'',confirmPassword:''})
        alert('Password changed successfully');
        
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const { iserror,isLoading, emailbtndisable, otp, otpbtndisable, isemailvalid, errorMsg, email, isOTPVerified, password, confirmPassword } = this.state;
    return (
      <div className="relative min-h-screen flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
          {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <Oval type="Puff" color="#00BFFF" height={50} width={50} />
          </div>
        )}

        {!isemailvalid && (
          <form onSubmit={this.onSubmitEmail} className="w-full max-w-md p-8 text-gray-200 bg-gray-800 rounded-lg">
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
              <button
                disabled={emailbtndisable}
                type="submit"
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {isemailvalid && !isOTPVerified && (
          <div className="max-w-sm mx-auto">
            <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
              {[...Array(6)].map((_, index) => (
                <div key={index}>
                  <input
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={otp[index] || ''}
                    onChange={(e) => this.handleInputChange(e, index)}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              ))}
            </div>
            <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Please enter the 6-digit OTP sent via email.
            </p>
            <button
              onClick={this.handleSubmit}
              type="submit"
              disabled={otpbtndisable}
              className="mt-4 bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </div>
        )}

        {isOTPVerified && (
          <form onSubmit={this.handleChangePasswordSubmit} className="w-full max-w-md p-8 text-gray-200 bg-gray-800 rounded-lg">
            <p className="text-xl font-bold w-full text-center">Change your Password</p>
            <div className="mt-4">
              <input
                className="text-gray-200 bg-gray-900 border rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                type="password"
                required
                name="password"
                placeholder="New Password"
                value={password}
                onChange={this.handleChangePassword}
              />
            </div>
            <div className="mt-4">
              <input
                className="text-gray-200 bg-gray-900 border rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                type="password"
                required
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={this.handleChangePassword}
              />
            </div>
            <div className="mt-8">
              <button type="submit" className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default ForgotPassword;
