import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'; 

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: ''
    };

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

       this.props.onAuth(newUserData, true);
    }

    render () {
        const errors = this.props.errors;

        //class
        const inputClass = 'form-control form-control-lg ';
        const nameClasses =  inputClass + ( errors.name ? ' is-invalid' : null );
        const emailClasses =  inputClass + ( errors.email ? ' is-invalid' : null );
        const passwordClasses =  inputClass + ( errors.password ? ' is-invalid' : null );
        const password2Classes =  inputClass + ( errors.password2 ? ' is-invalid' : null );

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
                                    className={nameClasses}
                                    placeholder="Name" 
                                    name="name" 
                                    value={this.state.name}
                                    onChange={this.onChangeHandler} />

                                {errors.name ? <div className="invalid-feedback">{errors.name}</div> :null }
                            </div>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    className={emailClasses}
                                    placeholder="Email Address" 
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler} />
                                
                                {errors.email ? <div className="invalid-feedback">{errors.email}</div> :null }
                            <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className={passwordClasses}
                                    placeholder="Password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler} />
                                {errors.password ? <div className="invalid-feedback">{errors.password}</div> :null }
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className={password2Classes}
                                    placeholder="Confirm Password" 
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onChangeHandler} />
                                {errors.password2 ? <div className="invalid-feedback">{errors.password2}</div> :null }
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    errors: state.auth.errors
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userData, isSignup) => dispatch(actions.auth(userData, isSignup))
    }
};

export default connect(null, mapDispatchToProps)(Register);