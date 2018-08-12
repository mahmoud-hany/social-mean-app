import React, { Component } from 'react';

import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner';

import * as actions from '../../store/actions';

import ProfileItem from '../../components/profiles/ProfileItem';

class Profiles extends Component {
    componentDidMount () {
        //fetch profiles
        this.props.onFetchProfiles();
    }

    render () {
        let profiles = this.props.profiles;

        let content;

        if (this.props.loading) {
            content = <Spinner />;
        }

        if (profiles) {
            if (profiles.length > 0) {
                content = profiles.map(profile => {
                    return <ProfileItem 
                                key={profile._id}
                                profile={profile} />;
                });
            }
        }
        

        return (
            <div className="container">
                <h1 className="display-4 text-center">Developers Profiles</h1>
                <p className="text-muted text-center">Browse and connect with developers</p>
                <div className="row">
                {content}
                </div>
            </div>
        );
    } 
};

const mapStateToProps = state => {
    return {
        profiles: state.profile.profiles,
        errors: state.profile.errors,
        loading: state.profile.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfiles: () => dispatch(actions.fetchProfiles())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);