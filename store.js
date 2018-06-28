import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import common from './Reducers/common';
import auth from './Reducers/auth';

const reducer = combineReducers({
    common,
    auth
});

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, middleware);

export default store;