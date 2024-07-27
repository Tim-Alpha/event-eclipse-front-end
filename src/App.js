import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './slices/userSlice';
import useIsLoggedIn from './components/useIsLoggedIn';
import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/Spinner';
import Venues from './components/Venues';

const Home = React.lazy(() => import('./Home'));
const OTPVerification = React.lazy(() => import('./components/OtpVerify'));
const AccountSetup = React.lazy(() => import('./components/AccountSetup'));
const Login = React.lazy(() => import('./components/Login'));
const Registration = React.lazy(() => import('./components/Registration'));
const ProtectedComponent = React.lazy(() => import('./components/ProtectedComponent'));

const App = () => {
  const dispatch = useDispatch();
  const token = useIsLoggedIn();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const parsedUser = user && user !== 'undefined' ? JSON.parse(user) : null;

    if (token && parsedUser) {
      dispatch(login({ token, user: parsedUser }));
      axios.defaults.headers.common['event-token'] = `${token}`;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
    }
  }, [dispatch, token]);

  axios.defaults.baseURL = "https://eventeclipsebackend.onrender.com/api/v1/";

  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner />
      </div>
    }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/auth" element={<AccountSetup />} />
        <Route path="/user/verify" element={<OTPVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path='/venues/search' element={<Venues />} />
        <Route path="/protected" element={
          <PrivateRoute>
            <ProtectedComponent />
          </PrivateRoute>
        } />
      </Routes>
    </Suspense>
  );
}

export default App;
