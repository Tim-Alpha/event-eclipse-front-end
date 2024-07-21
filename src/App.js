import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import OTPVerification from './components/OtpVerify';
import AccountSetup from './components/AccountSetup';
import Login from './components/Login';
import Registration from './components/Registration';
import PrivateRoute from './components/PrivateRoute';
import ProtectedComponent from './components/ProtectedComponent';
import './App.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './slices/userSlice';
import useIsLoggedIn from './components/useIsLoggedIn';

const App = () => {
  const dispatch = useDispatch();
  const token = useIsLoggedIn();

  useEffect(() => {
    if (token) {
      dispatch(login({ token }));
      axios.defaults.headers = { 'event-token': token };
    }
  }, [dispatch, token]);

  axios.defaults.baseURL = "https://eventeclipsebackend.onrender.com/api/v1/";

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/auth" element={<AccountSetup />} />
      <Route path="/user/verify" element={<OTPVerification />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/protected" element={
        <PrivateRoute>
          <ProtectedComponent />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
