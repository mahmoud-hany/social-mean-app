import React, { Component } from 'react';

import Input from '../../components/form/input';

class CreateProfile extends Component {
    state = {
        handle: '',
        company: '',
        skills: '',
        status: '',
        bio: '',
        website: '',
        location: '',
        githubusername: '',
        displaySocialInputs: false,
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        github: '',
        youtube: '',
        errors: {}
    }
    
    render() {
        return (
            <div className="createProfile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="text-center display-4">Create Your Profile</h1>
                            <p className="lead text-center text-muted"> Let's get some information to make your profile stand out</p>

                            <form>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default CreateProfile;