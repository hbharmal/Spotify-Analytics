const initialState = {
    timeRange: 0,
    artistsList: [],
    fetchArtistsSuccess: false,
    fetchArtistsPending: false 
};
  
export const artistsReducer = (state = initialState, action) => {
  
    switch (action.type) {
        
        case "FETCH_ARTISTS_PENDING":
        return {
            ...state,
            fetchArtistsPending: true
        };
    
        case "FETCH_ARTISTS_SUCCESS":
        return {
            ...state,
            artistsList: action.artists,
            fetchArtistsSuccess: true,
            fetchArtistsPending: false
        };
    
        case "FETCH_ARTISTS_ERROR":
        return {
            ...state,
            fetchArtistsSuccess: false,
            fetchArtistsPending: false
        };

        case "CHANGE_TIME_RANGE_ARTISTS":
            return {
                ...state, 
                timeRange: action.range 
            }
    
        default:
            return state;
    }
};
  

export default artistsReducer;