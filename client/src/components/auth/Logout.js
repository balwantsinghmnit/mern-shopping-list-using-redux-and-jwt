//@ts-ignore
import React, { Component,Fragment } from 'react';
import {logout} from "../../actions/authActions.js";
//@ts-ignore
import {connect} from "react-redux";
//@ts-ignore
import PropTypes from "prop-types";
//@ts-ignore
import { NavLink } from 'reactstrap';

class Logout extends Component {
    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} href="#">LogOut</NavLink>
            </Fragment>
        )
    }
}

Logout.propTypes = {
    logout:PropTypes.func.isRequired
}

export default connect(null,{logout})(Logout);
