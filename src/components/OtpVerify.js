import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import "./OtpVerify.css"; 
import verify from "../assets/lotify/verify.json" 
import Lottie from 'lottie-react'; 
import { useNavigate } from "react-router-dom"; 
import Loader from './Loader';
import Toaster from './Toaster';

const OTPVerification = () => { 
 
  const navigate = useNavigate(); 
 
  const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem('userData'))); 
  const [mobileNumber, setMobileNumber] = useState(userData?.mobile); 
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => { 
    const storedUserData = JSON.parse(localStorage.getItem('userData')); 
    setUserData(storedUserData); 
    setMobileNumber(storedUserData?.mobile); 
    if (!storedUserData || !storedUserData.mobile) { 
      navigate('/login');
    } 
  }, [navigate]); 
 
  const [otp, setOtp] = useState({ 
    digit1: "", 
    digit2: "", 
    digit3: "", 
    digit4: "" 
  }); 
 
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    if (value.length === 1) { 
      const nextSibling = e.target.nextSibling; 
      if (nextSibling && nextSibling.type === "text") { 
        nextSibling.focus(); 
      } 
    } 
    setOtp(prevState => ({ 
      ...prevState, 
      [name]: value 
    })); 
  }; 
 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setLoading(true);
    try { 
      const enteredOTP = `${otp.digit1}${otp.digit2}${otp.digit3}${otp.digit4}`; 
      console.log("Entered OTP:", enteredOTP); 
       
      const response = await axios.post("users/verify/number", { 
        number: mobileNumber, 
        otp: enteredOTP 
      }); 
      setStatusCode(200);
      setMessage('Verification Successful');
      console.log("Verification Successful:", response.data); 
      localStorage.removeItem('userData'); 
      navigate('/login'); 
    } catch (error) { 
      console.error("Verification Failed:", error); 
      setStatusCode(500);
      setMessage('Verification Failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }; 
 
  if (!mobileNumber) { 
    return null; 
  } 
 
  return ( 
   <div className="main"> 
    {loading && <Loader />}
    {statusCode && <Toaster message={message} statusCode={statusCode} />}
    <div style={{ width: "25%"}}> 
      <Lottie animationData={verify}/> 
    </div> 
    <div className="container-verify"> 
      <h1>OTP Verification</h1>
      <form onSubmit={handleSubmit}> 
        <div><p>OTP sent to your registered mobile number: {mobileNumber}</p></div> 
        <div className="input-group mb-3"> 
          <input type="text" id="digit1" name="digit1"  value={otp.digit1} onChange={handleChange} maxLength="1" required /> 
          <input type="text" id="digit2" name="digit2"  value={otp.digit2} onChange={handleChange} maxLength="1" required /> 
          <input type="text" id="digit3" name="digit3"  value={otp.digit3} onChange={handleChange} maxLength="1" required /> 
          <input type="text" id="digit4" name="digit4"  value={otp.digit4} onChange={handleChange} maxLength="1" required /> 
        </div> 
        <div className="d-grid mt-3"> 
          <button type="submit" className="btn btn-primary">Verify</button> 
        </div> 
      </form>
    </div> 
    </div> 
  ); 
}; 
 
export default OTPVerification;
