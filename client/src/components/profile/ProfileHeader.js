import React from 'react';

import isEmpty from '../../validation/isEmpty';

const ProfileHeader = (props) => {
    const profile = props.profile;
    console.log(profile)

    return (
        <div>
            <div className="card card-body bg-info text-white mb-3">
                <div className="imgBox" style={{width: '200px', margin: 'auto'}}>
                    <img src={isEmpty(profile.user) ? null : profile.user.avatar} className="rounded-circle" alt="profile" />
                </div> 
                <div className="text-center">
                    <h1 className="display-4">{isEmpty(profile.user) ? null : profile.user.name}</h1>         
                    <p className="lead">
                        {profile.status} {isEmpty(profile.company) ? null : " at " + profile.company}
                    </p>

                    <p>{isEmpty(profile.location) ? null : profile.location}</p>

                    
                        {isEmpty(profile.website) ? null : (
                            <a className="text-white p-2" target="_blank" href={profile.website}>
                                <i className="fas fa-globe fa-2x"></i>
                            </a> 
                        )}
                        {isEmpty(profile.social && profile.social.twitter) ? null : (
                            <a className="text-white p-2" target="_blank" href={profile.social.twitter}>
                                <i className="fab fa-twitter fa-2x"></i>
                            </a>
                        )}
                        {isEmpty(profile.social && profile.social.facebook) ? null : (
                            <a className="text-white p-2" target="_blank" href={profile.social.facebook}>
                                <i className="fab fa-facebook fa-2x"></i>
                            </a>
                        )}
                        {isEmpty(profile.social && profile.social.instagram) ? null : (
                            <a className="text-white p-2" target="_blank" href={profile.social.instagram}>
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>
                        )}
                        {isEmpty(profile.social && profile.social.github) ? null : (
                            <a className="text-white p-2" target="_blank" href={profile.social.github}>
                                <i className="fab fa-github fa-2x"></i>
                            </a>
                        )}
                        {isEmpty(profile.social && profile.social.youtube) ? null : (
                            <a className="text-white p-2" target="_blank" href={profile.social.youtube}>
                                <i className="fab fa-youtube fa-2x"></i>
                            </a>
                        )}
                        {isEmpty(profile.social && profile.social.linkedin) ? null : (
                            <a className="text-white p-2" target="_blank" href={profile.social.linkedin}>
                                <i className="fab fa-linkedin fa-2x"></i>
                            </a>
                        )}
                       
               
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;