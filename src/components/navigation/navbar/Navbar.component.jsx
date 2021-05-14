import React from 'react';
import './Navbar.styles.scss';
import {NavLink} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FaSpaceShuttle } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function CustomNavbar() {
    
  return(
      <IconContext.Provider value={{ color: "white", size: "20px" }}>
      <Navbar className="custom_navbar" expand="lg">
        <FaSpaceShuttle /> <Navbar.Brand className="custom_title"  href="/">Cosmos Odyssey</Navbar.Brand>
        <div className="spacer"></div>
        <Navbar.Collapse >
        <Nav>
          <NavLink to="/" >Home</NavLink>
          <NavLink to="/reservForm" > Bookings</NavLink>
          <NavLink to="/userReservations" > All Bookings</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </IconContext.Provider>
  );
}