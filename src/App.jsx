import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Login from './components/login';
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
