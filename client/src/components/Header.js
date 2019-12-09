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

const navbrand = {
    color: '#38C9E6',
    fontWeight: '600',
    fontFamily: "'Permanent Marker', cursive",

}
const navtext = {
    color: 'black',
    fontFamily: "'Righteous', cursive",
}

const Header = props => {

    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand style={navbrand} href="/">Leadster</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <input style={navtext} type="text" placeholder="Search.."></input>
            </NavItem>
            <NavItem>
              <NavLink style={navtext} href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={navtext} href="/community">Community</NavLink>
            </NavItem>
            
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  );
}


export default Header;