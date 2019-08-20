export const changeAnalysisMode = (mode) => {
    return {
        type: 'CHANGE_ANALYSIS_MODE',
        mode: mode 
    };
};

export const setHoveredIndex = (index) => {
    return {
        type: "SET_HOVERED_INDEX",
        index: index
    };
};