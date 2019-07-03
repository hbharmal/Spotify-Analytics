const initialState = {
    userinfoPending: false,
    userinfoSucess: false,
    information: ""
}

export const userinfoReducer = (state = initialState, action) => {
    
    switch (action.type) {
        
        case 'FETCH_USER_PENDING':
            return {
                ...state, 
                userinfoPending: true
            }
        
        case 'FETCH_USER_COMPLETE':
            return {
                ...state,
                userinfoPending: false 
            }
        
        case 'FETCH_USER_SUCCESS':
            return {
                ...state, 
                userinfoSucess: true,
                information: action.info 
            }
        
        case 'FETCH_USER_ERROR':
            return {
                ...state, 
                userinfoPending: false,

            }
        
        default: {
            return {
                ...state
            }
        }

    };

}

export default userinfoReducer;