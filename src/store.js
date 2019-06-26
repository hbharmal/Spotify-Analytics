import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const middleware = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(
    rootReducer, 
    initialState, 
    middleware
);

export default store;