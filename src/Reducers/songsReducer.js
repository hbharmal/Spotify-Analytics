const initialState = {
    timeRange: 0,
    songsList: [],
    fetchSongsSuccess: false,
    fetchSongsPending: false 
};
  
export const songsReducer = (state = initialState, action) => {
  
    switch (action.type) {
        
        case 'FETCH_SONGS_PENDING':
            return {
                ...state,
                fetchSongsPending: true
            };
    
        case 'FETCH_SONGS_SUCCESS':
            return {
                ...state,
                songsList: action.songs,
                fetchSongsSuccess: true,
                fetchSongsPending: false
            };
        
        case 'FETCH_SONGS_ERROR':
            return {
                ...state,
                fetchSongsSuccess: false,
                fetchSongsPending: false
            };
        
        case "CHANGE_TIME_RANGE_SONGS":
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
  

export default songsReducer;