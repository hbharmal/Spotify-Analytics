export const changeAnalysisMode = (mode) => {
    return {
        type: 'CHANGE_ANALYSIS_MODE',
        mode: mode 
    };
};

export const fetchSongFeaturesPending = () => {
    return {
        type: 'FETCH_SONG_FEATURES_PENDING'
    };
};

export const fetchSongFeaturesComplete = () => {
    return {
        type: 'FETCH_SONG_FEATURES_COMPLETE'
    };
};

export const fetchSongFeaturesSuccess = (songFeatures) => {
    return {
        type: 'FETCH_SONG_FEATURES_SUCCESS',
        songFeatures: songFeatures
    };
};

export const fetchSongFeaturesError = (error) => {
    return {
        type: 'FETCH_SONG_FEATURES_ERROR'
    };
};

export const fetchSongFeatures = (accessToken, ids) => {

    const idsString = ids.join(",");

    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/audio-features/?ids=${idsString}`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        fetch(request).then(res => {
            return res.json();
        }).then(data => {
            dispatch(fetchSongFeaturesSuccess(data));
        }).catch(err => {
            dispatch(fetchSongFeaturesError(err));
        });

    }

}

export const setHoveredIndex = (index) => {
    return {
        type: "SET_HOVERED_INDEX",
        index: index
    };
};