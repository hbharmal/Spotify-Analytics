import { rangeToString } from '../utils';

export const fetchSongsPending = () => {
    return {
        type: 'FETCH_SONGS_PENDING'
    };
};

export const fetchSongsComplete = () => {
    return {
        type: 'FETCH_SONGS_COMPLETE'
    };
};

export const fetchShortTermSongsSuccess = (songs) => {
    return {
        type: 'FETCH_SHORT_TERM_SONGS_SUCCESS',
        songs: songs
    };
};

export const fetchMediumTermSongsSuccess = (songs) => {
    return {
        type: 'FETCH_MEDIUM_TERM_SONGS_SUCCESS',
        songs: songs
    };
};

export const fetchLongTermSongsSuccess = (songs) => {
    return {
        type: 'FETCH_LONG_TERM_SONGS_SUCCESS',
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
        const request = new Request(`https://api.spotify.com/v1/me/top/tracks?time_range=${rangeString}&limit=50`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            if (range == 0) {
                dispatch(fetchShortTermSongsSuccess(res.items));
            } else if (range == 1) {
                dispatch(fetchMediumTermSongsSuccess(res.items));
            } else if (range == 2) {
                dispatch(fetchLongTermSongsSuccess(res.items));
            }
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

