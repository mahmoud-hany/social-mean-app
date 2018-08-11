import React, { Component } from 'react';

import {connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Input from '../../../components/form/input';

import * as actions from '../../../store/actions/index';

class AddExperience extends Component {
    state = {
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    };

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheckedHandler = () => {
        this.setState(prevState => ({current: !prevState.current}));
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        //add Expericence
        const experienceData = {
            title: this.state.title,
            company: this.state.company,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.statedescription
        };
       
        this.props.onAddExperience(experienceData, this.props.history);
    }

    render () {

        const errors = this.props.errors;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Dashboard
                        </Link>
                        
                        <h1 className="display-4 text-center"> Add Your Experience </h1>
                        <p className="lead text-muted text-center">Add any developer/programming positions that you have had in the past</p>

                        <form onSubmit={this.onSubmitHandler}>
                            <Input 
                                elementType="input"
                                elementConfig={{type: 'text', placeholder: 'Job title', name: 'title'}}
                                errors={errors}
                                value={this.state.title}
                                changed={this.onChangeHandler}
                            />

                            <Input 
                                elementType="input"
                                elementConfig={{type: 'text', placeholder: 'Company', name: 'company'}}
                                errors={errors}
                                value={this.state.company}
                                changed={this.onChangeHandler}
                            />

                            <Input 
                                elementType="input"
                                elementConfig={{type: 'text', placeholder: 'Location', name: 'location'}}
                                value={this.state.location}
                                changed={this.onChangeHandler}
                            />

                            <h6>From Date</h6>
                            <Input 
                                elementType="input"
                                elementConfig={{type: 'date', name: 'from'}}
                                errors={errors}
                                value={this.state.from}
                                changed={this.onChangeHandler}
                            />
                            
                            <h6>To Date</h6>
                            <Input 
                                elementType="input"
                                elementConfig={{type: 'date', name: 'to', disabled: this.state.current}}
                                value={this.state.to}
                                changed={this.onChangeHandler}
                            />

                            <div className="custom-control custom-checkbox mb-3">
                                <input 
                                    type="checkbox" 
                                    name="current"
                                    value={this.state.current}
                                    onChange={this.onCheckedHandler}
                                    className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Current Job</label>
                            </div>

                            <Input 
                                elementType="textarea" 
                                elementConfig={{placeholder: 'Job description', name: 'description'}}
                                value={this.state.description}
                                changed={this.onChangeHandler}
                                info="Some of your responsabilities, etc"/>

                            <button className="btn btn-info btn-block mt-4" type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        errors: state.profile.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddExperience: (experienceData, history) => dispatch(actions.addExperience(experienceData, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);


