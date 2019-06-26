import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import artistsReducer from './artistsReducer';
import songsReducer from './songsReducer';

export default combineReducers({
    token: tokenReducer,
    artists: artistsReducer,
    songs: songsReducer
});