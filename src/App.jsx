import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <>
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  </>
);

export default App;
