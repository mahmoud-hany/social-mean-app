import React from 'react';

const ProfileAbout = (props) => {
    //For the skills
    const skills = props.profile.skills;

    let skillsContent = skills.map((skill, index) => {
        return  <div className="p-3" key={index}>
                    <i className="fas fa-check"></i> {skill}
                </div>
    });

    // for bio
    const bio = props.profile.bio;
    
    let bioContent = null;
    
    if (bio) {
        bioContent = (
            <div className="bio text-center">
                <h3 class="text-info">{props.profile.user ? props.profile.user.name : null }'s Bio</h3>
                
                <p class="lead">{bio}</p>
                <hr />
            </div>
        );   
    }


    return (
        <div className="card card-body bg-light mb-3">
            {bioContent}

            <h3 class="text-center text-info">Skill Set</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skillsContent}
            </div>
        </div>
    );
};

export default ProfileAbout;