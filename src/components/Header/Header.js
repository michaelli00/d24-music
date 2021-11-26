import React from 'react';
import Container from 'react-bootstrap/container';
import Navbar from 'react-bootstrap/navbar';
import Nav from 'react-bootstrap/nav';
import { NavLink } from "react-router-dom";

import './Header.css';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid className="Header">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/ti" className="nav-link">T/I Group</NavLink>
            <NavLink to="/plr" className="nav-link">PLR Group</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  );
}

export default Header;
