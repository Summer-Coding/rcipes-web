import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../Navbar';
import { Container } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <section className="content">
        <Container>{children}</Container>
      </section>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
