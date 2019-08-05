import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import artistsReducer from './artistsReducer';
import songsReducer from './songsReducer';
import userinfoReducer from './userinfoReducer';
import songfeaturesReducer from './songfeaturesReducer';
import genreAnalysisReducer from './genreAnalysisReducer';

export default combineReducers({
    token: tokenReducer,
    artists: artistsReducer,
    songs: songsReducer,
    user: userinfoReducer,
    songFeatures: songfeaturesReducer,
    genreAnalysis: genreAnalysisReducer
});