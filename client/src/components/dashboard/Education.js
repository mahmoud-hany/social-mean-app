import React from "react";
import Moment from 'react-moment'; 

const Education = (props) => {
    let content = null;

    let educations = null;
    let descExist = [];

    if (props.educationsArray) {
        educations = props.educationsArray.map(edu => {
            // CHeck if desc exist in the object
            descExist.push("description" in edu);
            
            return (
                <tr key={edu._id}>
                    <td>{edu.school}</td>
                    <td>{edu.degree}</td>
                    <td>{edu.fieldofstudy}</td>
                    <td>
                        <Moment format="YYYY/MM/DD">{edu.from}</Moment> - 
                        { edu.to === null ? ("  Now") : ( <Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
                    </td>
                    <td>{edu.description}</td>
                    <td><button onClick={() => props.clicked(edu._id)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
            );
        });

        if (props.educationsArray.length > 0) {
            content =  (
                <div>           
                    <h4 className="mb-2 mt-4">Education Credentials</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>School</th>
                                <th>Degree</th>
                                <th>Field Of Study</th>
                                <th>Year</th>
                                {descExist.filter(item => item === true).length >= 1 ? <th>Description</th> : null}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {educations}
                        </tbody>
                    </table>
                </div>
            );
        }
         
    }

    return content;

};

export default Education;