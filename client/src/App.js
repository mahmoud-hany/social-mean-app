import React, { Component } from 'react';

import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from './store/actions';

import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import asyncComponent from './hoc/asyncComponent';

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
    return import('./containers/create-profile/createProfile');
});


//check if the there's token in the localstorage
class App extends Component {

    componentDidMount() {
        this.props.onCheckAuthState();
    }

    render() {
        let privateRoutes;

        if ( this.props.isAuthenticated ) {
            privateRoutes = (
                <Switch>
                    <Route exact path="/dashboard" component={AsyncDashboard} />
                    <Route exact path="/create-profile" component={AsyncCreateProfile} />
                </Switch>
            );
        } else {
            privateRoutes = <Redirect to="/"/>;
        }
    
        return (
            <div className="App">
                <Navbar />

                {/* Puplic Routes*/}
                <Route exact path="/" component={Landing}/>
                <Route exact path="/login" component={AsyncLogin} />
                <Route exact path="/register" component={AsyncRegister} />
                
                {/* Private Routes */}
                {privateRoutes}
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
