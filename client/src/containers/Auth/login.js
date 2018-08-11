import React, { Component } from 'react';

import classnames from 'classnames';

import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/index';

class Login extends Component {
    state = { 
        email: '',
        password: '',
    }

    componentDidMount () {
        if (this.props.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        // collect data
        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.onAuth(userData, this.props.history);

    }

    render () {
        const errors = this.props.errors;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors ? (errors.email ):false
                                    })} 
                                    placeholder="Email Address" 
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler} />
                                {errors ? (errors.email ? <div className="invalid-feedback">{errors.email}</div> : null) : null}
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors ? (errors.password ) : false
                                    })}  
                                    placeholder="Password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler} />

                                {errors ? (errors.password ? <div className="invalid-feedback">{errors.password}</div> : null) : null}
                            </div>
                            <input 
                                type="submit" className="btn btn-info btn-block mt-4" value="Login"/>
                        </form>
                        </div>
                    </div>
                </div>
          </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        errors: state.auth.errors,
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userData, history) => dispatch(actionTypes.auth(userData, false, history))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Login);