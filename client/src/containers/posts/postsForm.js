import React, {Component} from 'react';

import {connect} from 'react-redux';

import Input from '../../components/form/input';

import * as actions from '../../store/actions/index';

class PostsForm extends Component {
    state = {
        text: ''
    };

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        
        const newPost = {
            text: this.state.text,
            name: this.props.user.name,
            avatar: this.props.user.avatar
        };

        this.props.onAddPost(newPost);

        // empty the textarea
        this.setState({text: ''});
    };

    render () {
        return (
            <div className="card text-white mb-3">
                <div className="card-header bg-primary">Add New Post</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmitHandler}>
                        <Input 
                            elementType='textarea'
                            elementConfig={{placeholder: 'Create Post...', name: 'text', autoFocus: true}}
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
    onAddPost: (post) => dispatch(actions.addPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsForm);

