const initialState = {
    artistsList: [],
    fetchArtistsError: false,
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
            fetchArtistsError: false,
            fetchArtistsPending: false
        };
    
        case "FETCH_ARTISTS_ERROR":
        return {
            ...state,
            fetchArtistsError: true,
            fetchArtistsPending: false
        };
    
        default:
            return state;
    }
};
  

export default artistsReducer;