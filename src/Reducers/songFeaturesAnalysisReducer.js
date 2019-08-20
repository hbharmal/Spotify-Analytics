const initialState = {
    shortTermSongFeatures: [],
    mediumTermSongFeatures: [],
    longTermSongFeatures: [],
    fetchSongFeaturesSuccess: false,
    fetchSongFeaturesPending: false,
    fetchSongFeaturesComplete: false
}

export const songFeaturesAnalysisReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case 'FETCH_SONG_FEATURES_PENDING':
            return {
                ...state,
                fetchSongFeaturesPending: true 
            }
        
        case 'FETCH_SONG_FEATURES_COMPLETE':
            return {
                ...state, 
                fetchSongFeaturesPending: false,
                fetchSongFeaturesComplete: true 
            }
        
        case 'FETCH_SHORT_TERM_SONG_FEATURES_SUCCESS':
            return {
                ...state, 
                fetchSongFeaturesSuccess: true,
                shortTermSongFeatures: action.songFeatures
            }

        case 'FETCH_MEDIUM_TERM_SONG_FEATURES_SUCCESS':
            return {
                ...state, 
                fetchSongFeaturesSuccess: true,
                mediumTermSongFeatures: action.songFeatures
            }
        
        case 'FETCH_LONG_TERM_SONG_FEATURES_SUCCESS':
            return {
                ...state, 
                fetchSongFeaturesSuccess: true,
                longTermSongFeatures: action.songFeatures
            }
        
        case 'FETCH_SONG_FEATURES_ERROR':
            return {
                ...state,
                fetchSongFeaturesPending: false,
                fetchSongFeaturesSuccess: false,
                fetchSongFeaturesComplete: false
            }

        default:
            return {
                ...state
            }
    }
}

export default songFeaturesAnalysisReducer;