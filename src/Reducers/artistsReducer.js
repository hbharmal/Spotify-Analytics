const initialState = {
    timeRange: 0,
    shortTermArtistList: [],
    mediumTermArtistList: [],
    longTermArtistList: [],
    artistIds: [],
    artistGenres: [],
    relatedArtistIds: [], 
    fetchArtistsSuccess: false,
    fetchArtistsPending: false,
    fetchArtistsComplete: false 
}
  
export const artistsReducer = (state = initialState, action) => {
  
    switch (action.type) {
        
        case "FETCH_ARTISTS_PENDING":
            return {
                ...state,
                fetchArtistsPending: true
            };
        
        case "FETCH_ARTISTS_COMPLETE":
            return {
                ...state,
                fetchArtistsPending: false,
                fetchArtistsComplete: true 
            }
        
        case "FETCH_SHORT_TERM_ARTISTS_SUCCESS":
            return {
                ...state,
                shortTermArtistList: action.artists,
                fetchArtistsSuccess: true,
            };

        case "FETCH_MEDIUM_TERM_ARTISTS_SUCCESS":
            return {
                ...state,
                mediumTermArtistList: action.artists,
                fetchArtistsSuccess: true,
            };

        case "FETCH_LONG_TERM_ARTISTS_SUCCESS":
            return {
                ...state,
                longTermArtistList: action.artists,
                fetchArtistsSuccess: true,
            };
    
        case "FETCH_ARTISTS_ERROR":
            return {
                ...state,
                fetchArtistsSuccess: false,
                fetchArtistsPending: false,
                fetchArtistsComplete: false 
            };
        
        case "ADD_ARTIST_IDS":
            return {
                ...state,
                artistIds: action.ids 
            };
        
        case "ADD_ARTIST_GENRES":
            return {
                ...state,
                artistGenres: action.genres 
            }
        
        case "CHANGE_TIME_RANGE_ARTISTS":
            return {
                ...state,
                timeRange: action.range 
            }
    
        default:
            return {
                ...state
            };
    }
};
  

export default artistsReducer;