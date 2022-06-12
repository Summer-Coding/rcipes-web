import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';

const AppNavbar = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="light" light expand="md" container="md">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {session && <NavLink href="/profile">Profile</NavLink>}
          <NavItem>
            {session ? (
              <NavLink href="/logout">Logout</NavLink>
            ) : (
              <NavLink href="/login">Login</NavLink>
            )}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

AppNavbar.propTypes = {
  session: PropTypes.object.isRequired,
};

export default AppNavbar;
