import React from 'react';

import { Link } from 'react-router-dom'; 

import isEmpty from '../../validation/isEmpty';

const ProfileItem = (props) => {
    const profile = props.profile;

    return (
        <div className="card card-body mt-2">
            <div className="row">
                <div className="col-2">
                    <div className="imgBox">
                        <img src={profile.user.avatar} className="rounded-circle" alt={profile.user.name}/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3>{profile.user.name}</h3>
                    <p>
                        {profile.status} {isEmpty(profile.company) ? null : " at " + profile.company}
                    </p>
                    <p>
                        {isEmpty(profile.location) ? null : profile.location}
                    </p>
                    <Link to={`/profile/${profile.handle}`} className="btn btn-info btn-sm"> View Profile</Link>
                </div>
                <div className="col-md-4 d-none d-sm-block">
                    <h4>Skill set</h4>
                    <ul className="list-group">
                        {profile.skills.slice(0, 4).map((skill, index) => {
                            return (
                                <li key={index} className="list-group-item">
                                    <i className="fas fa-check pr-1"></i> {skill}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            
        </div>
    );
}

export default ProfileItem;