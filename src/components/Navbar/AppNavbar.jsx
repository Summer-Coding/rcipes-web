import React, { useMemo, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { isAdmin } from '../../lib/sessionUtils.js';
import { supabase } from '../../lib/supabaseClient.ts';

const AppNavbar = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const userIsAdmin = useMemo(() => {
    return isAdmin(session);
  }, [session]);

  const logout = () => {
    supabase.auth.signOut();
  };

  return (
    <Navbar color="light" light expand="md" container="md">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {session && userIsAdmin && (
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Admin
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <NavLink href="/admin/users">Users</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/password">Password</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          {session && (
            <NavItem>
              <NavLink href="/profile">Profile</NavLink>
            </NavItem>
          )}
          <NavItem>
            {session ? (
              <NavLink href="/login" onClick={logout}>
                Logout
              </NavLink>
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
