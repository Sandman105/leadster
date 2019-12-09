import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Redirect } from 'react-router-dom';

const Header = props => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    sessionStorage.clear();
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Leadster</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <input type="text" placeholder="Search.."></input>
            </NavItem>
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/community">Community</NavLink>
            </NavItem>
            <NavItem onClick={handleSignOut}>
              <NavLink href='/home' className={"btn btn-danger btn-sm"}>Sign Out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}


export default Header;