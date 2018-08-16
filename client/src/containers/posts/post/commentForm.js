import React, {Component} from 'react';

import {connect} from 'react-redux';

import Input from '../../../components/form/input';

import * as actions from '../../../store/actions/index';

class CommentForm extends Component {
    state = {
        text: ''
    };

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        const postID = this.props.postId;
        
        const newComment = {
            text: this.state.text,
            name: this.props.user.name,
            avatar: this.props.user.avatar
        };

        this.props.onAddComment(postID, newComment);

        // empty the textarea
        this.setState({text: ''});
    };

    render () {
        return (
            <div className="card text-white mb-3">
                <div className="card-header bg-primary">Add New Comment</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmitHandler}>
                        <Input 
                            elementType='textarea'
                            elementConfig={{placeholder: 'Write Comment...', name: 'text', autoFocus: true}}
                            value={this.state.text}
                            changed={this.onChangeHandler}/>
                        <input type="submit" className="btn btn-sm btn-dark" value="Publish"/>
                    </form>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    onAddComment: (postId, comment) => dispatch(actions.addComment(postId, comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

