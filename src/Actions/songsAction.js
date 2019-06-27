import { rangeToString } from '../utils';

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

export const fetchSongs = (accessToken, range) => {

    const rangeString = rangeToString(range);
    
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/me/top/tracks?time_range=${rangeString}`, {
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

// Change time range for top artists
export const changeTimeRangeSongs = (range) => {
    return {
        type: 'CHANGE_TIME_RANGE_SONGS',
        range: range 
    }
}

