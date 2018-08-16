import React from 'react';

import {Link} from 'react-router-dom';

const Comments = (props) => {
    const comments = props.comments;
    
    let commentsContent ;

    if (comments && comments.length > 0) {
        commentsContent = comments.map(comment => {
            return (
                <div key={comment._id}>
                    <div className="row"  style={{maxHeight: '150px'}}>
                        <div className="col-md-2">
                            <Link to="/profile/handle">
                                <img className="rounded-circle d-none d-md-block" style={{maxWidth: '70px'}} src={comment.avatar}
                                alt="" />
                            </Link>
                            <br />
                            <p className="text-center">{comment.name}</p>
                        </div>
                        <div className="col-md-10">  
                            <p className="lead text-muted">{comment.text}</p>

                            {comment.user === props.userId ? 
                                <button onClick={() => props.deleteComment(comment._id, props.postId)} className="btn btn-danger" >
                                    <i className="fas fa-times"></i>
                                </button>: null}
                        </div>
                    </div>
                    <hr/>
                </div>
            );
        })
    }

    return (
       <div className="container">
            <div className="card card-body mb-2">
                {commentsContent}
            </div>
        </div>   
    );
};

export default Comments;