import React from 'react';
import Buttons from './buttons';
import Experiecnces from './Experience';
import Educations from './Education';

const DashboardContent = (props) => {
    return (
        <div>
            <p className="lead text-muted"> Welcome <span className="text-primary">{props.user.name}</span> </p>
            <Buttons />

            <Experiecnces experiencesArray={props.experiencesArray} clicked={props.deleteExperience}/>
        
            <Educations educationsArray={props.educationsArray} clicked={props.deleteEducation} />

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