const initialState = {
    mode: 0,
    hoveredIndex: null
}

export const analysisReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case 'CHANGE_ANALYSIS_MODE':
            return {
                ...state,
                mode: action.mode 
            }  
        
        case 'SET_HOVERED_INDEX':
            return {
                ...state, 
                hoveredIndex: action.index 
            }
               
        default:
            return {
                ...state 
            }

    }
    
}

export default analysisReducer;