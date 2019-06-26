const initialState = {
    token: '',
    fetchTokenSuccess: false 
}

export const tokenReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'FETCH_TOKEN_ERROR':
            return {
                ...state, 
                fetchTokeSuccess: false
            }
        case 'SET_TOKEN':
            return {
                ...state, 
                fetchTokenSuccess: true,
                token: action.token
            }
        default:
            return {
                state
            }
    };

}

export default tokenReducer;