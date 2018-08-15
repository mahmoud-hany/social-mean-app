import React, {Component} from 'react';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';

import Spinner from '../../components/spinner/spinner';

import PostsForm from './postsForm';
import PostItem from '../../components/posts/postItem';

class Posts extends Component {
    componentDidMount () {
        // fetch all posts from database
        this.props.onFetchPosts();
    }

    deletePostHandler = (postId) => {
        this.props.onDeletePost(postId);
    } 

    likeHandler = (postId) => {
        this.props.onLike(postId);
    }
    
    render () {
        const { posts, errors, loading, user } = this.props;

        let postContent;

        if (loading) {
            postContent = <Spinner />
        }
        
        if (errors) {
            postContent = <p className="alert alert-danger alert-dismissible fade show">Some thing went wrong</p>
        }

        if (posts && posts.length > 0) {
            postContent = posts.map(post => {
                return <PostItem    key={post._id} 
                                    post={post} 
                                    user={user} 
                                    like={() => this.likeHandler(post._id)}
                                    delete={() => this.deletePostHandler(post._id)}
                                    postLiked={user ? ( post.likes.filter(like => like.user === user.id).length > 0 ? true : false ) : null}/>
            });
        }

        return (
            <div className="container">
                <PostsForm />
                {postContent}
            </div>
        );
    }
};

const mapStateToProps = state => ({
    posts: state.post.posts,
    errors: state.post.errors,
    loading: state.post.loading,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    onFetchPosts: () => dispatch(actions.fetchPosts()),
    onDeletePost: (postId) => dispatch(actions.deletePost(postId)),
    onLike: (postId) => dispatch(actions.like(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);