import React from "react";
import Moment from 'react-moment';

const Experience = (props) => {
    let content = null;

    let experiences = null;
    let descExist = [];
    let location = [];

    if (props.experiencesArray) {
        experiences = props.experiencesArray.map(exp => {
            // CHeck if desc and locatin exist in the object
            descExist.push("description" in exp);
            location.push("location" in exp);

            return (
                <tr key={exp._id}>
                    <td>{exp.company}</td>
                    <td>{exp.title}</td>
                    <td>{exp.location}</td>
                    <td>
                        <Moment format="YYYY/MM/DD">{exp.from}</Moment> - 
                        { exp.to === null ? ("Now") : ( <Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
                    </td>
                    <td>{exp.description}</td>
                    <td><button onClick={() => props.clicked(exp._id)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
            );
        });

        if (props.experiencesArray.length > 0) {
            content =  (
                <div>
                    <h4 className="mb-2">Experience Credentials</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Title</th>
                                {location ? <th>Location</th> : null}
                                <th>Year</th>
                                {descExist.filter(item => item === true).length >= 1 ? <th>Description</th> : null}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {experiences}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
    return content;
};

export default Experience;