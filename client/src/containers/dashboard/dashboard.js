import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import Spinner from '../../components/spinner/spinner';

class Dashboard extends Component {
    componentDidMount () {
        this.props.onFetchProfile();
    }
    
    render () {

        // let dashboardContent = <h4>Display Profile</h4>;

        // if (this.props.profile) {

        // }

        let dashboardContent;

        if (this.props.loading || this.props.profile === null) {
            dashboardContent = <Spinner />;
        } else {
            // Check if user have profile 
            if (Object.keys(this.props.profile).length > 0) {
                //user don'have profile
                dashboardContent = <h4>Display Profile</h4>
            } else {
                //user don't have profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted"> Welcome { this.props.user.name }</p>
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
        onFetchProfile: () => dispatch(actions.fetchProfile())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);