import { reduceFeatures } from "../utils";

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

    const idsString = ids.join(",");

    // time period is a variable that indicates the time range for the song features
    // 1: short, 2: medium, 3: long

    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/audio-features/?ids=${idsString}`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        fetch(request).then(res => {
            return res.json();
        }).then(data => {
            const filteredData = reduceFeatures(data.audio_features);
            switch (timePeriod) {
                case 1: 
                    dispatch(fetchShortTermSongFeaturesSuccess(filteredData));
                case 2: 
                    dispatch(fetchMediumTermSongFeaturesSuccess(filteredData));
                case 3:
                    dispatch(fetchLongTermSongFeaturesSuccess(filteredData));
            }
        }).catch(err => {
            dispatch(fetchSongFeaturesError(err));
        });

    }

}


