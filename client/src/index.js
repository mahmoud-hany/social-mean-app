import React from 'react';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Reducers files
import authReducer from './store/reducer/auth';
import profileReducer from './store/reducer/profiles';
import PostReducer from './store/reducer/posts';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    post: PostReducer, 
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose;

const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk ) ));

const app = (
    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter >
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
