import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import { Link } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner';

import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileAbout from '../../components/profile/ProfileAbout';
import ProfileCreds from '../../components/profile/ProfileCreds';
import ProfileGithub from '../../components/profile/Profile.github';

class Profile extends Component {
    componentDidMount () {
        console.log(this.props.match.params.handle);

        let handle = this.props.match.params.handle;
        
        if (handle) {
            this.props.OnGetProfileByHandle(handle);
        }
    }
    render () {
        let profileContent = null ;
        
        const profile = this.props.profile;  

        if (profile === null || this.props.loading) {
            // the profile is not exist yet
            profileContent = <Spinner />
        } else {
            //profeli is exist
            profileContent = (
                <div>
                    <ProfileHeader profile={profile}/>
                    <ProfileAbout profile={profile}/>
                    <ProfileCreds />
                    <ProfileGithub />
                </div>
            );
        }

        return (
            <div className="container">
                <Link to="/profiles" className="btn btn-light mb-3">Back to Profiles</Link>

                <div className="row">
                    <div className="col-md-12">
                        {profileContent}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    profile: state.profile.profile,
    errors: state.profile.errors,
    loading: state.profile.loading
});

const mapDispatchToProps = dispatch => ({
    OnGetProfileByHandle: (handle) => dispatch(actions.getProfileByHandle(handle)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);