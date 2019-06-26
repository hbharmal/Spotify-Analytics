export const fetchSongsPending = () => {
    return {
        type: 'FETCH_SONGS_PENDING'
    };
};

export const fetchSongsSuccess = (songs) => {
    return {
        type: 'FETCH_SONGS_SUCCESS', 
        songs: songs
    };
};

export const fetchSongsError = () => {
    return {
        type: 'FETCH_SONGS_ERROR'
    };
};

export const fetchSongs = (accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/me/top/tracks`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        dispatch(fetchSongsPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            dispatch(fetchSongsSuccess(res.items));
        }).catch(err => {
            dispatch(fetchSongsError(err));
        });
    };
};
