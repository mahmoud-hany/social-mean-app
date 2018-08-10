import React, { Component } from 'react';

import { Route, withRouter } from 'react-router-dom';

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

//check if the there's token in the localstorage
class App extends Component {

    componentDidMount() {
        this.props.onCheckAuthState();
    }

    render() {
        return (
            <div className="App">
                <Navbar />

                <Route exact path="/" component={Landing}/>
                <Route exact path="/login" component={AsyncLogin} />
                <Route exact path="/register" component={AsyncRegister} />
                
                <Footer />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(actions.checkAuthState())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
