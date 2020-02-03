import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import SideNavbar from '../SideNavBar/SideNavBar'
import { Redirect } from 'react-router-dom';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout = () => {
        localStorage.removeItem('token')
    }

    render() {
        return (
            <div>
                {localStorage.getItem('token') ?
                    <SideNavbar /> : ""
                }
                <Navbar color="dark" dark expand="sm" className="mb-5 nav-bar-fixed-top">
                    <Container>
                        <NavbarBrand href="/startup-info" className="mr-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Shark_Tank_TV_logo.svg/1280px-Shark_Tank_TV_logo.svg.png" alt="Paris" width="50" height="30" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {localStorage.getItem('token') ?
                                    <NavLink onClick={this.logout} href="/login">
                                        Logout
                                    </NavLink> :
                                    ""
                                }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default AppNavbar;