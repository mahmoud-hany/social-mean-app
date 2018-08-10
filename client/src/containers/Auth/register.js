import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import  classnames  from 'classnames';

import * as actions from '../../store/actions/index'; 

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: ''
    };

    componentDidMount () {
        if (this.props.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        // collect form data
        const newUserData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };

       this.props.onAuth(newUserData, true, this.props.history);
    }

    render () {
        const errors = this.props.errors;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors ? (errors.name ):false
                                    })} 
                                    placeholder="Name" 
                                    name="name" 
                                    value={this.state.name}
                                    onChange={this.onChangeHandler} />

                                {errors ? (errors.name ? <div className="invalid-feedback">{errors.name}</div> : null) : null}
                            </div>
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

                            <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors ? (errors.password):false
                                    })}
                                    placeholder="Password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler} />

                                {errors ? (errors.password ? <div className="invalid-feedback">{errors.password}</div> : null) : null}

                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors ? (errors.password2):false
                                    })}
                                    placeholder="Confirm Password" 
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onChangeHandler} />

                                {errors ? (errors.password2 ? <div className="invalid-feedback">{errors.password2}</div> : null) : null}

                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" value="Sign Up"/>
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
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userData, isSignup, history) => dispatch(actions.auth(userData, isSignup, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));