import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './components/Login';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <>
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Layout>
  </>
);

export default App;
