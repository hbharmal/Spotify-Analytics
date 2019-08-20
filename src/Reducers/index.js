import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import artistsReducer from './artistsReducer';
import songsReducer from './songsReducer';
import userinfoReducer from './userinfoReducer';
import analysisReducer from './analysisReducer';
import genreAnalysisReducer from './genreAnalysisReducer';
import songFeaturesAnalysisReducer from './songFeaturesAnalysisReducer'; 

export default combineReducers({
    token: tokenReducer,
    artists: artistsReducer,
    songs: songsReducer,
    user: userinfoReducer,
    analysis: analysisReducer,
    genreAnalysis: genreAnalysisReducer,
    songFeaturesAnalysis: songFeaturesAnalysisReducer
});