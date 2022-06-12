import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../Navbar';
import { Container } from 'reactstrap';
import './layout.css';

const Layout = ({ children, session }) => {
  return (
    <>
      <Navbar session={session} />
      <section className="content">
        <Container>{children}</Container>
      </section>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  session: PropTypes.object.isRequired,
};

export default Layout;
