import React, { useMemo, useState } from 'react';
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
import { isAdmin } from '../../lib/sessionUtils.ts';

const AppNavbar = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const userIsAdmin = useMemo(() => {
    return isAdmin(session);
  }, [session]);

  return (
    <Navbar color="light" light expand="md" container="md">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {session && userIsAdmin && (
            <NavItem>
              <NavLink href="/admin/users">Users</NavLink>
            </NavItem>
          )}
          {session && (
            <NavItem>
              <NavLink href="/profile">Profile</NavLink>
            </NavItem>
          )}
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
  session: PropTypes.object,
};

export default AppNavbar;
