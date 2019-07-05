const initialState = {
    songFeatures: [],
    fetchSongFeaturesSuccess: false,
    fetchSongFeaturesPending: false 
}

export const songfeaturesReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'FETCH_SONG_FEATURES_PENDING':
            return {
                ...state,
                fetchSongFeaturesPending: true 
            }
        
        case 'FETCH_SONG_FEATURES_COMPLETE':
            return {
                ...state, 
                fetchSongFeaturesPending: false 
            }
        
        case 'FETCH_SONG_FEATURES_SUCCESS':
            return {
                ...state, 
                fetchSongFeaturesSuccess: true,
                songFeatures: action.songFeatures
            }
        
        case 'FETCH_SONG_FEATURES_ERROR':
            return {
                ...state,
                fetchSongFeaturesPending: false,
                fetchSongFeaturesSuccess: false 
            }
        
        default:
            return {
                ...state 
            }

    }
    
}

export default songfeaturesReducer;