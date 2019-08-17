// top genres will include the top 6 genres (5 plus an other genre)
// top artists is an array that will consist of json objects that map each genre to a list of top user artists associated with that genre
// top songs is an array that will constist of json objects that map each genre to a list of top user songs associated with that genre
const initialState = {
    topGenres: [],
    topArtists: [],
    currentGenre: 100
};

export const genreAnalysisReducer = (state = initialState, action) => {

    switch(action.type) {
        case "SET_CURRENT_GENRE":
            return {
                ...state, 
                currentGenre: action.index  
            }
        
        case "SET_TOP_GENRES":
            return {
                ...state,
                topGenres: action.genres 
            }
        
        default: 
            return {
                ...state 
            }
    }
};

export default genreAnalysisReducer;