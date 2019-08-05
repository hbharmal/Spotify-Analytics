const initialState = {
    timeRange: 0,
    shortTermSongList: [],
    mediumTermSongList: [],
    longTermSongList: [],
    songIds: [],
    fetchSongsSuccess: false,
    fetchSongsPending: false,
    fetchSongsComplete: false 
};
  
export const songsReducer = (state = initialState, action) => {
  
    switch (action.type) {
        
        case 'FETCH_SONGS_PENDING':
            return {
                ...state,
                fetchSongsPending: true
            };
        
        case "FETCH_SONGS_COMPLETE":
            return {
                ...state, 
                fetchSongsPending: false,
                fetchSongsComplete: true 
            }
    
        case "FETCH_SHORT_TERM_SONGS_SUCCESS":
            return {
                ...state,
                shortTermSongList: action.songs,
                fetchSongsSuccess: true,
            };

        case "FETCH_MEDIUM_TERM_SONGS_SUCCESS":
            return {
                ...state,
                mediumTermSongList: action.songs,
                fetchSongsSuccess: true,
            };

        case "FETCH_LONG_TERM_SONGS_SUCCESS":
            return {
                ...state,
                longTermSongList: action.songs,
                fetchSongsSuccess: true,
            };
        
        case "ADD_SONG_IDS":
            return {
                ...state, 
                songIds: action.ids 
            }

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