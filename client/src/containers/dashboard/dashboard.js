import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import DashboardContent from '../../components/dashboard/dashboard';

import Spinner from '../../components/spinner/spinner';

class Dashboard extends Component {
    componentDidMount () {
        this.props.onFetchProfile();
    }

    deleteAcountHandler = () => {
        // confirm action
        if (window.confirm("Are you sure ? your profile and acount will be deleted And this can't be undone!") ) {
            this.props.onDleteAcount();
        }
    }

    deleteExperienceHandler = (ID) => {
        this.props.onDeleteExperience(ID);
    }

    deleteEducationHandler = (ID) => {
        this.props.onDeleteEducation(ID);
    }
    
    render () {

        let dashboardContent;

        if (this.props.loading || this.props.profile === null) {
            dashboardContent = <Spinner />;
        } else {
            // Check if user have profile 
            if (Object.keys(this.props.profile).length > 0) {
                //user don'have profile
                dashboardContent = <DashboardContent 
                                        user={this.props.user} 
                                        experiencesArray={this.props.profile.experience}
                                        educationsArray={this.props.profile.education}
                                        clicked={this.deleteAcountHandler}
                                        deleteExperience={this.deleteExperienceHandler}
                                        deleteEducation={this.deleteEducationHandler}/>
            } else {
                //user don't have profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted"> Welcome <span className="text-primary">{ this.props.user.name }</span></p>
                        <p>You have'nt yet setup a profile, Please add some info</p>
                        <Link to="/create-profile" className="btn btn-info btn-lg" > Create Profile </Link>
                    </div>
                );
            } 

        }

        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4">Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        errors: state.profile.errors,
        profile: state.profile.profile,
        loading: state.profile.loading,
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: () => dispatch(actions.fetchProfile()),
        onDleteAcount: () => dispatch(actions.deleteAcount()),
        onDeleteExperience: (id) => dispatch(actions.deleteExperience(id)),
        onDeleteEducation: (id) => dispatch(actions.deleteEducation(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);