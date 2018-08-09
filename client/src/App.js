import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './containers/Auth/login';
import Register from './containers/Auth/register';
import Footer from './components/layout/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Footer />
      </div>
    );
  }
}

export default App;
