import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,

  NavbarText
} from 'reactstrap';

const NavBar = () => {

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">SimpleVoting</NavbarBrand>
          <Nav className="mr-auto" navbar>
          </Nav>
          <NavbarText>
              <NavLink href="/components/">All Campaign List</NavLink>
            </NavbarText>
          <NavbarText>Admin Login</NavbarText>
      </Navbar>
    </div>
  );
}

export default NavBar;