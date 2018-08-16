import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/index';

class Navbar extends Component {

    onLogoutHandler = (e) => {
        e.preventDefault();

        this.props.onLogout();
        this.props.onClearProfileStateOnLogout();
    }

    render () {
        const isAuthenticated = this.props.isAuthenticated;
        const user = this.props.user;

        let navLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="login">Login</Link>
                </li>
            </ul>
        );

        if (user && isAuthenticated) {
            navLinks = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/posts" title="posts">
                            Posts
                        </Link> 
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard" title="dashboard">
                            Dashboard
                        </Link>
                    </li>
                   <li className="nav-item">
                        <a  href="" 
                            onClick={this.onLogoutHandler} 
                            className="nav-link">
                                <img src={user.avatar} className="rounded-circle" alt={user.name} style={{width: '30px', marginRight: '5px'}} title="gravatar"/>
                                {'  '} Logout
                        </a>
                   </li>
                </ul>
            );
        }

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">DevConnector</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="profiles"> Developers
                                </Link>
                            </li>
                        </ul>

                       {navLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        onClearProfileStateOnLogout: () => dispatch(actions.clearProfileStateOnLogout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);