import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './SideNavbar.css';

import { Link, Route, Switch} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

export default props => {
    return (
      // Pass on our props
      <Menu {...props}>
        <a className="menu-item" href="/startup-info">
          Home
        </a>
  
        <a className="menu-item" href="#">
          My Connections
        </a>
  
        <a className="menu-item" href="#">
            Meetings
        </a>

        <a className="menu-item" href="#">
          Help
        </a>
      </Menu>
    );
  };