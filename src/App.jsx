import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile/Profile';
import { supabase } from './lib/supabaseClient.ts';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Layout session={session}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute session={session} redirectRoute="/login" />
            }
          >
            {session && session.user && (
              <Route
                path="/profile"
                element={<Profile user={session.user} />}
              />
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
