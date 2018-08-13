import React, { Component } from 'react';

import { Route, withRouter, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from './store/actions';

import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import asyncComponent from './hoc/asyncComponent';
import PrivateRoute from './hoc/privateRoute';

import profiles from './containers/profiles/profiles';
import profile from './containers/profile/profile';

// lazyLoading login component
const AsyncLogin = asyncComponent(() => {
    return import('./containers/Auth/login');
});

// lazyLoading register component
const AsyncRegister = asyncComponent(() => {
    return import('./containers/Auth/register');
});

// lazyLoading Dashboard
const AsyncDashboard = asyncComponent(() => {
    return import('./containers/dashboard/dashboard');
});

// lazyLoading CreateProfile
const AsyncCreateProfile = asyncComponent(() => {
    return import('./containers/dashboard/create-profile/createProfile');
});

// lazyLoading Edit profile
const AsyncEditProfile = asyncComponent(() => {
    return import('./containers/dashboard/editProfile/editProfile');
});

// lazyLoading Add Experience
const AsyncAddExperience = asyncComponent(() => {
    return import('./containers/dashboard/addExperience/addExperience');
});

// lazyLoading Add Experience
const AsyncAddEducation = asyncComponent(() => {
    return import('./containers/dashboard/addEducation/addEducation');
});

//check if the there's token in the localstorage
class App extends Component {

    componentDidMount() {
        this.props.onCheckAuthState();
    }

    render() {
        return (
            <div>
                <Navbar />
    
                <Route exact path="/" component={Landing}/>
                <Route exact path="/login" component={AsyncLogin} />
                <Route exact path="/register" component={AsyncRegister} />
                <Route exact path="/profiles" component={profiles} />
                <Route exact path="/profile/:handle" component={profile} />
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={AsyncDashboard}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/create-profile"
                        component={AsyncCreateProfile}
                    />
                </Switch>

                 <Switch>
                    <PrivateRoute
                        exact
                        path="/edit-profile"
                        component={AsyncEditProfile}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/add-experience"
                        component={AsyncAddExperience}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/add-education"
                        component={AsyncAddEducation}
                    />
                </Switch>

                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(actions.checkAuthState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));