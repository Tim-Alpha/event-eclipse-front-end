import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../slices/userSlice';
import Header from './Header';
import Footer from './Footer';
import "./Login.css";
import log from "../assets/lotify/Log.json";
import Lottie from 'lottie-react';
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import axios from 'axios';
import IsMobile from './MobileDetection';
import Loader from './Loader';
import DialogBoxPopup from './DialogBox';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [disableClass, setDisableClass] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = IsMobile();

  useEffect(() => {
    isMobile ? setDisableClass('disableMe') : setDisableClass("");
  }, [isMobile]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('users/login', {
        username,
        password
      });
      const data = response.data;

      if (data.status === 'success') {
        setStatusCode(200);
        if (isChecked) {
          localStorage.setItem('token', data.token);
        }
        dispatch(login({ token: data.token, user: data.user }));
        navigate('/home');
      } else {
        setStatusCode(400);
      }
    } catch (error) {
      console.error("Login Failed:", error);
      setStatusCode(500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      {statusCode && <DialogBoxPopup statusCode={statusCode} />}
      <Header />
      <div>
        <div className='main'>
          <div className="container">
            <div className={`animatedSvg ${disableClass}`}>
              <Lottie className={disableClass} animationData={log} />
            </div>
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <FaUser className='icon' />
              </div>
              <div className="input-box">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder='Password'
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {password === "" ? (
                  <FaLock className='icon' />
                ) : (
                  passwordVisible ? (
                    <FaEyeSlash className='icon' onClick={() => setPasswordVisible(false)} />
                  ) : (
                    <FaEye className='icon' onClick={() => setPasswordVisible(true)} />
                  )
                )}
              </div>

              <div className="remember">
                <label className={`rememberMe ${isChecked ? 'onRememberMe' : ''}`}>
                  <input
                    type="checkbox"
                    name='check'
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />Remember me
                </label>
                <p type="button" className="forgot-password" onClick={() => navigate('/forgot-password')}>Forgot Password?</p>
              </div>

              <button type="submit"> Login </button>
              <div className="register-link">
                <p onClick={() => navigate('/register')}>
                  Don't have an account? <span className='registerHere'>Register here</span>.
                </p>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
