import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Users from './components/Admin/Users';
import { supabase } from './lib/supabaseClient.ts';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Layout session={session}>
        <Routes>
          {/* Unrestricted Routes */}
          <Route path="/login" element={<Login />} />

          {/* Restricted Routes */}
          <Route
            element={
              <ProtectedRoute session={session} redirectRoute="/login" />
            }
          >
            {session && (
              <>
                <Route
                  path="/profile"
                  element={<Profile user={session.user} />}
                />
              </>
            )}
          </Route>

          {/* Admin routes */}
          <Route
            element={
              <ProtectedRoute
                session={session}
                redirectRoute="/"
                requiredRole="admin"
              />
            }
          >
            {session && (
              <>
                <Route path="/admin/users" element={<Users />} />
              </>
            )}
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<div>Page Not found</div>} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
