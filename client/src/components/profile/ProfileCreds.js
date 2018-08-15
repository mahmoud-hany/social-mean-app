import React from 'react';

import Moment from 'react-moment'
const ProfileCreds = (props) => {
    //for experience
    let experience = props.profile.experience;
    let experienceContent = null;
    if (experience) {
        
        const mapExperience = experience.map((exp, index) => {
            return (
                <li className="list-group-item" key={index}>
                    <h4>{exp.company}</h4>
                    <p>
                        <Moment format="YYYY/MM/DD" >{exp.from} </Moment> - 
                        {exp.to ? <Moment format="YYYY/MM/DD" >{exp.to}</Moment> : " Now"};
                    </p>
                    <p>
                        <strong>Position: </strong> {exp.title}
                    </p>   
                    {exp.description ? ( <p> <strong>Description:</strong> {exp.description}</p>) : null}

                </li>
            );
        });
        experienceContent = (
            <ul className="list-group">
                {mapExperience}
            </ul>
        );
    }

     //for education
    let education = props.profile.education;
    let educationContent = null;
    if (education) {
         
        const mapEducation = education.map((edu, index) => {
            return (
                <li className="list-group-item" key={index}>
                    <h4>{edu.school}</h4>
                    <p>
                         <Moment format="YYYY/MM/DD" >{edu.from} </Moment> - 
                         {edu.to ? <Moment format="YYYY/MM/DD" >{edu.to}</Moment> : " Now"};
                     </p>
                     <p>
                         <strong>Degree: </strong> {edu.degree}
                     </p> 
                     <p>
                         <strong>Field of study: </strong> {edu.fieldofstudy}
                     </p>     
                     {edu.description ? ( <p> <strong>Description:</strong> {edu.description}</p>) : null}
 
                 </li>
             );
         })
         educationContent = (
             <ul className="list-group">
                 {mapEducation}
             </ul>
         );
     }
    
    return (
        <div>
            <div className="row mt-3 mb-3">
                <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    {experienceContent ? experienceContent : " No Experience was added"}
                </div>
                <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    {educationContent ? educationContent : " No Experience was added"}
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default ProfileCreds;