import React, { Component } from  'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Spinner from '../../../components/spinner/spinner';

import * as actions from '../../../store/actions/index';

import CommentForm from './commentForm';
import Comments from './comments';

class Post extends Component {

    componentDidMount () {
        this.props.onFetchPost(this.props.match.params.post_id);
    }

    deleteCommentHandler = (commentId, postID) => {
        this.props.onDeleteComment(commentId, postID);
    }

    render () {
        const { post, errors, loading, user } = this.props;
        const postID = this.props.match.params.post_id;

        let postContent;
        
        if (loading) {
            postContent = <Spinner />
        }

        if (errors) {
            postContent = <p className="alert alert-danger">Try again...</p>
        }

        if (post && user) {
            postContent = (
                <div className="post">
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
                            <p className="lead text-muted">{post.text}</p>
                        </div>
                    </div>

                    <CommentForm postId={postID}/>
                    <Comments   comments={post.comments} 
                                userId={user.id} 
                                postId={postID}
                                deleteComment={this.deleteCommentHandler}/>
                </div>
            );
        }
    
        return (
            <div className="container">
                <Link to="/posts" className="btn btn-light mb-3">Back To Posts</Link>
                <div className="card card-body mb-3">               
                    {postContent}
                </div>
               
            </div>
        );
    }
};

const mapStateToProps = state => ({
    post: state.post.post,
    errors: state.post.errors,
    loading: state.post.loading,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    onFetchPost: (postId) => dispatch(actions.fetchPost(postId)),
    onDeleteComment: (commentId, postId) => dispatch(actions.deleteComment(commentId, postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
