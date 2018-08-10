import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Dashboard extends Component {
    componentDidMount () {
        this.props.onFetchProfile();
    }
    
    render () {

        let dashboardContent;

        if (this.props.loading || this.props.profile === null) {
            dashboardContent = <h1> loading... </h1>;
        }

        if (this.props.profile) {
            dashboardContent = <h1> Hello </h1>;
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: () => dispatch(actions.fetchProfile())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);