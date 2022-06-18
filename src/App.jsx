import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import Home from './components/Home';
import PasswordManager from './components/Admin/Password/PasswordManager';
import Profile from './components/Profile';
import Users from './components/Admin/Users';
import { supabase } from './lib/supabaseClient.ts';
import { setSession } from './lib/store/sessionSlice';
import { setUser } from './lib/store/userSlice';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();

  const dispatchData = () => {
    dispatch(setSession());
    dispatch(setUser());
  };

  useEffect(() => {
    dispatchData();

    supabase.auth.onAuthStateChange(() => {
      dispatchData();
    });
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          {/* Unrestricted Routes */}
          <Route path="/login" element={<Login />} />

          {/* Restricted Routes */}
          <Route element={<ProtectedRoute redirectRoute="/login" />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Admin routes */}
          <Route
            element={<ProtectedRoute redirectRoute="/" requiredRole="admin" />}
          >
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/password" element={<PasswordManager />} />
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<div>Page Not found</div>} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
