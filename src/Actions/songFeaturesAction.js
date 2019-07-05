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
            console.log(data);
            dispatch(fetchSongFeaturesSuccess(data.audio_features));
        }).catch(err => {
            dispatch(fetchSongFeaturesError(err));
        });

    }



}