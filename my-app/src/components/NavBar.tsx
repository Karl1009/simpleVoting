import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavbarText,
  Button
} from 'reactstrap';
import { Link } from "react-router-dom"
import styles from "../css/NavBar.module.css";

const NavBar = () => {
  
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/"><NavbarText className={styles.simpleVoting}>Simple Voting</NavbarText></Link>
        <Link to="/allcampaigns" >
                  <Button color="info">
                  All Campaigns
                  </Button>
                 </Link>
          <Nav className="mr-auto" navbar>
          </Nav>

            <Link to="/" >
                  <Button color="primary">
                  Admin Login
                  </Button>
                 </Link>

            
      </Navbar>
    </div>
  );
}

export default NavBar;