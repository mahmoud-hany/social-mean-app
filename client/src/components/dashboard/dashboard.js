import React from 'react';
import Buttons from './buttons';

const DashboardContent = (props) => {
    return (
        <div>
            <p className="lead text-muted"> Welcome <span className="text-primary">{props.user.name}</span> </p>
            <Buttons />

            <h4>TODO: Experiecnces</h4>
            <h4>TODO: Education</h4>

            <div className="mt-5">
                <button 
                    onClick={props.clicked}
                    className="btn btn-danger"
                    >
                    Delete My Account
                </button>
            </div>  
        </div>
    );
};

export default DashboardContent;