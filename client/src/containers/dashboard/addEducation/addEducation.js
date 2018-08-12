import React, { Component } from 'react';

import {connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Input from '../../../components/form/input';

import * as actions from '../../../store/actions/index';

class AddEducation extends Component {
    state = {
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        description: ''
    };

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        //add new education
        const educationData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description
        };
       
        this.props.onAddEducation(educationData, this.props.history);
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
                        
                        <h1 className="display-4 text-center"> Add Your Education </h1>
                        <p className="lead text-muted text-center">Add any school, bootcamp, etc that you have attended</p>

                        <form onSubmit={this.onSubmitHandler}>
                            <Input 
                                elementType="input"
                                elementConfig={{type: 'text', placeholder: 'School Or Bootcamp', name: 'school'}}
                                errors={errors}
                                value={this.state.school}
                                changed={this.onChangeHandler}
                            />

                            <Input 
                                elementType="input"
                                elementConfig={{type: 'text', placeholder: 'Degree Or Certificate', name: 'degree'}}
                                errors={errors}
                                value={this.state.degree}
                                changed={this.onChangeHandler}
                            />

                            <Input 
                                elementType="input"
                                elementConfig={{type: 'text', placeholder: 'Field Of Study', name: 'fieldofstudy'}}
                                errors={errors}
                                value={this.state.fieldofstudy}
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
                                elementConfig={{type: 'date', name: 'to'}}
                                value={this.state.to}
                                changed={this.onChangeHandler}
                            />

                            <Input 
                                elementType="textarea" 
                                elementConfig={{placeholder: 'Job description', name: 'description'}}
                                value={this.state.description}
                                changed={this.onChangeHandler}
                                info="Tell us about your experience and what you learned"/>

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
        errors: state.profile.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddEducation: (educationData, history) => dispatch(actions.addEducation(educationData, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);