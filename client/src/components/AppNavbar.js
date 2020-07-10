// @ts-ignore
import React, { Component } from 'react';
// @ts-ignore
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from 'reactstrap';
import RegisterModal from "./auth/RegisterModal.js";
import Logout from "./auth/Logout.js";
import LoginModal from "./auth/LoginModal.js";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Fragment } from 'react';

class AppNavbar extends Component {
    //@ts-ignore
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen:false
        }
    }

    toggle = () =>
    {
        // @ts-ignore
        this.setState({
            isOpen:!this.state.isOpen
        });
    }
    render() {
        const {isAuthenticated,user} = this.props.auth;

        const authLinks = (
            <Fragment>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                </span>
            </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
                <Fragment>
                                <NavItem>
                                    <RegisterModal />
                                </NavItem>
                                <NavItem>
                                    <LoginModal/>
                                </NavItem>
                </Fragment>
        );
        return (
            <div>
                <Navbar color="info" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">
                            ShoppingList
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse navbar isOpen={this.state.isOpen}>
                            <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
AppNavbar.propTypes = {
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    auth:state.auth
})
export default connect(mapStateToProps,null)(AppNavbar);
