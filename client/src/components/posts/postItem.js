import React from 'react';

import { Link } from 'react-router-dom';

import classnames from 'classnames';

const PostItem = (props) => {
    const post = props.post;
    const user = props.user; 

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <Link to="/profile/handle">
                        <img className="rounded-circle d-none d-md-block" src={post.avatar}
                        alt="" />
                    </Link>
                    <br />
                    <p className="text-center">{post.name}</p>
                </div>

                <div className="col-md-10">
          
                    <p className="lead">{post.text}</p>

                    <button type="button" 
                            onClick={props.like} 
                            className="btn btn-light mr-1">

                        <i className={classnames("fas fa-thumbs-up", {
                            'text-info': props.postLiked
                        })}></i>

                        <span className="badge badge-light">{post.likes.length}</span>
                    </button>

                    <Link to={`/posts/${post._id}`} className="btn btn-info mr-1">
                        Comments
                    </Link>

                    {post.user === user.id ? 
                        ( <button   type="button" 
                                    className="btn btn-danger mr-1"
                                    onClick={props.delete}>
                            <i className="fas fa-times" />
                        </button>) : null}
                </div>
            </div>
        </div>
    );
};

export default PostItem;