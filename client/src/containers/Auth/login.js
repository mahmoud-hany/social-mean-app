import React, { Component } from 'react';

import classnames from 'classnames';

import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/index';

class Login extends Component {
    state = { 
        email: '',
        password: '',
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

        this.props.onAuth(userData);
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
                                        'is-invalid': errors.email
                                    })} 
                                    placeholder="Email Address" 
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler} />
                                {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.password
                                    })}  
                                    placeholder="Password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler} />

                                {errors.password ? <div className="invalid-feedback">{errors.password}</div> : null}
                            </div>
                            <input 
                                type="submit" className="btn btn-info btn-block mt-4" />
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
        errors: state.auth.errors 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userData) => dispatch(actionTypes.auth(userData, false, null))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Login);