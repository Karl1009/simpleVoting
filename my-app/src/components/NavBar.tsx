import React from 'react';
import {
  Navbar,
  Nav,
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
        <Link to="/" >
                <Button color="warning" className={styles.votingResultButton}>
                <div>Main Page</div>
                </Button>
                </Link>
        <Link to="/finishedCampaign" >
                <Button color="danger" className={styles.votingResultButton}>
                <div>Finished Campaign</div>
                </Button>
                </Link>
          <Nav className="mr-auto" navbar>
          </Nav>
          <Link to="/allcampaigns" >
                  <Button color="info" className={styles.votingResultButton}>
                  All Campaigns
                  </Button>
                 </Link>
            <Link to="/newcampaign" >
                  <Button color="primary" className={styles.votingResultButton}>
                  Create a new campaign
                  </Button>
                 </Link>
      </Navbar>
    </div>
  );
}

export default NavBar;