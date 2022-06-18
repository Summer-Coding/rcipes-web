import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { isAdmin } from '../../lib/sessionUtils.js';
import { supabase } from '../../lib/supabaseClient.ts';

const AppNavbar = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const userIsAdmin = useMemo(() => {
    return isAdmin(user);
  }, [user]);

  const logout = () => {
    supabase.auth.signOut();
  };

  return (
    <Navbar color="light" light expand="md" container="md">
      <NavbarBrand href="/">Recipes</NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {!user.isLoading && userIsAdmin && (
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
          {!user.isLoading && user.isLoggedIn && (
            <NavItem>
              <NavLink href="/profile">Profile</NavLink>
            </NavItem>
          )}
          <NavItem>
            {!user.isLoading && user.isLoggedIn ? (
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

export default AppNavbar;
