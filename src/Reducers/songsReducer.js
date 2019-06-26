const initialState = {
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
    
        default:
            return state;
    }
};
  

export default songsReducer;