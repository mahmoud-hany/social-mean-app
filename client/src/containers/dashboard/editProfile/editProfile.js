import React, { Component } from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import Input from '../../../components/form/input';

import isEmpty from '../../../validation/isEmpty';

import * as actions from '../../../store/actions/index'; 

class EditProfile extends Component {
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
    };

    componentDidMount () {
        // get data from profile if exist
        const profile = this.props.profile;

        if (profile) {
            // get skills and join  it and seprate them with comma
            const skills = profile.skills.join(','); 

            //if profile fields does'nt exist make it empty string
            profile.company = !isEmpty(profile.company) ? profile.company : ''; 
            profile.website = !isEmpty(profile.website) ? profile.website : ''; 
            profile.location = !isEmpty(profile.location) ? profile.location : ''; 
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''; 
            profile.bio = !isEmpty(profile.bio) ? profile.bio : ''; 

            // socail links
            profile.social = !isEmpty(profile.social) ? profile.social :{};

            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook :'';
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter :'';
            profile.github = !isEmpty(profile.social.github) ? profile.social.github :'';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin :'';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube :'';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram :'';

            this.setState({
                handle: profile.handle,
                company: profile.company,
                skills: skills,
                status: profile.status,
                bio: profile.bio,
                website:  profile.website,
                location: profile.location,
                githubusername: profile.githubusername,
                facebook: profile.facebook,
                twitter: profile.twitter,
                linkedin: profile.linkedin,
                instagram:  profile.instagram,
                github: profile.github,
                youtube: profile.youtube,
            });
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleSocialIconsHandler = () => {
        // toggle social Links
        this.setState( prevState => ({
            displaySocialInputs: !prevState.displaySocialInputs
        }))
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            skills: this.state.skills,
            status: this.state.status,
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
            githubusername: this.state.githubusername,
            facebook: this.state.facebook,
            twitter: this.state.twitter,
            linkedin: this.state.linkedin,
            instagram: this.state.instagram,
            github: this.state.github,
            youtube: this.state.youtube
        };

        // Dispatch request
        this.props.onCreateProfile(profileData, this.props.history);
    }
    
    render() {
        const errors = this.props.errors;
        
        let socialInputs;
        if (this.state.displaySocialInputs) {
            socialInputs = (
                <div>
                    <Input 
                        elementType="inputWithIcon" 
                        elementConfig={{type: 'text', placeholder: 'Facebook Page URL', name: 'facebook'}}
                        value={this.state.facebook}
                        changed={this.onChangeHandler}
                        errors={errors}
                        iconClasses="fab fa-facebook-f"/>

                    <Input 
                        elementType="inputWithIcon" 
                        elementConfig={{type: 'text', placeholder: 'Linkedin Profile URL', name: 'linkedin'}}
                        value={this.state.linkedin}
                        changed={this.onChangeHandler}
                        errors={errors}
                        iconClasses="fab fa-linkedin-in"/>

                    <Input 
                        elementType="inputWithIcon" 
                        elementConfig={{type: 'text', placeholder: 'YouTube Channel URL', name: 'youtube'}}
                        value={this.state.youtube}
                        changed={this.onChangeHandler}
                        errors={errors}
                        iconClasses="fab fa-youtube"/>

                    <Input 
                        elementType="inputWithIcon" 
                        elementConfig={{type: 'text', placeholder: 'Instagram Page URL', name: 'instagram'}}
                        value={this.state.instagram}
                        changed={this.onChangeHandler}
                        errors={errors}
                        iconClasses="fab fa-instagram"/>

                    <Input 
                        elementType="inputWithIcon" 
                        elementConfig={{type: 'text', placeholder: 'Twitter Profile URL', name: 'twitter'}}
                        value={this.state.twitter}
                        changed={this.onChangeHandler}
                        errors={errors}
                        iconClasses="fab fa-twitter"/>

                    <Input 
                        elementType="inputWithIcon" 
                        elementConfig={{type: 'text', placeholder: 'Github Page URL', name: 'github'}}
                        value={this.state.github}
                        changed={this.onChangeHandler}
                        errors={errors}
                        iconClasses="fab fa-github"/>
                </div>
            );
        }
        return (
            <div className="createProfile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <Link to="dashboard" className="btn btn-light mb-5">
                                Dashboard
                            </Link>
                            <h1 className="text-center display-4">Edit Your Profile</h1>

                            <form onSubmit={this.onSubmitHandler}>
                               
                                <Input 
                                    elementType="input" 
                                    elementConfig={{type: 'text', placeholder: 'Profile Handel', name: 'handle'}}
                                    value={this.state.handle}
                                    changed={this.onChangeHandler}
                                    errors={errors}
                                    info="A unique handle for your profile Url. Your full name or company name, nickname, etc..."/>
                                    
                                <Input 
                                    elementType="select" 
                                    elementConfig={{
                                        name: 'status',
                                        options: [
                                            {value: '0', displayValue: 'Select Profisional Status'},
                                            {value: 'Developer', displayValue: 'Developer'},
                                            {value: 'Junior Developer', displayValue: 'Junior Developer'},
                                            {value: 'Senior Developer', displayValue: 'Senior Developer'},
                                            {value: 'Student or Learning', displayValue: 'Student or Learning'},
                                            {value: 'Instructor or Teacher', displayValue: 'Instructor or Teacher'},
                                            {value: 'Intern', displayValue: 'Intern'},
                                            {value: 'Other', displayValue: 'Other'}            
                                        ]
                                    }}
                                    value={this.state.status}
                                    changed={this.onChangeHandler}
                                    errors={errors}
                                    info="Give us an idea of where you are at in your career"/>

                                <Input 
                                    elementType="input" 
                                    elementConfig={{type: 'text', placeholder: 'Company', name: 'company'}}
                                    value={this.state.company}
                                    changed={this.onChangeHandler}
                                    info="Could be your own company or one you work for"/>
                                
                                <Input 
                                    elementType="input" 
                                    elementConfig={{type: 'text', placeholder: 'Website', name: 'website'}}
                                    value={this.state.website}
                                    changed={this.onChangeHandler}
                                    errors={errors}
                                    info="Could be your own or a company website"/>
                                
                                <Input 
                                    elementType="input" 
                                    elementConfig={{type: 'text', placeholder: 'Location', name: 'location'}}
                                    value={this.state.location}
                                    changed={this.onChangeHandler}
                                    info="City & state suggested (eg. Boston, MA)"/>

                                <Input 
                                    elementType="input" 
                                    elementConfig={{type: 'text', placeholder: 'Skills', name: 'skills'}}
                                    value={this.state.skills}
                                    changed={this.onChangeHandler}
                                    errors={errors}
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"/>

                                <Input 
                                    elementType="input" 
                                    elementConfig={{type: 'text', placeholder: 'Github Username', name: 'githubusername'}}
                                    value={this.state.githubusername}
                                    changed={this.onChangeHandler}
                                    info="If you want your latest repos and a Github link, include your username"/>

                                <Input 
                                    elementType="textarea" 
                                    elementConfig={{placeholder: 'A short bio of yourself', name: 'bio'}}
                                    value={this.state.bio}
                                    changed={this.onChangeHandler}
                                    info="Tell us a little about yourself"/>

                                <div className="mb-3">
                                    <button
                                    onClick={this.toggleSocialIconsHandler}
                                    type="button" 
                                    className="btn btn-secondary btn-sm">Add Social Network Links </button>
                                    <span className="text-muted"> Optional</span>
                                </div>

                                {socialInputs}

                                <button className="btn btn-info btn-block mt-4" type="submit">Submit</button>

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
       errors: state.profile.errors,
       profile: state.profile.profile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateProfile: (profileData, history) => dispatch(actions.createProfile(profileData, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);