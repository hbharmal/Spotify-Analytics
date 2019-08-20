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

export const fetchShortTermSongFeaturesSuccess = (songFeatures) => {
    return {
        type: 'FETCH_SHORT_TERM_SONG_FEATURES_SUCCESS',
        songFeatures: songFeatures
    };
};

export const fetchMediumTermSongFeaturesSuccess = (songFeatures) => {
    return {
        type: 'FETCH_MEDIUM_TERM_SONG_FEATURES_SUCCESS',
        songFeatures: songFeatures
    };
};

export const fetchLongTermSongFeaturesSuccess = (songFeatures) => {
    return {
        type: 'FETCH_LONG_TERM_SONG_FEATURES_SUCCESS',
        songFeatures: songFeatures
    }
}

export const fetchSongFeaturesError = (error) => {
    return {
        type: 'FETCH_SONG_FEATURES_ERROR'
    };
};


export const fetchSongFeatures = (accessToken, ids, timePeriod) => {

    // time period is a variable that indicates the time range for the song features
    // 1: short, 2: medium, 3: long

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
            switch (timePeriod) {
                case 1: 
                    dispatch(fetchShortTermSongFeaturesSuccess(data));
                case 2: 
                    dispatch(fetchMediumTermSongFeaturesSuccess(data));
                case 3:
                    dispatch(fetchLongTermSongFeaturesSuccess(data));
            }
        }).catch(err => {
            dispatch(fetchSongFeaturesError(err));
        });

    }

}


