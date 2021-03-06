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

// add Song IDS to redux store for future processing 
export const addSongIds = (ids) => {
    var uniqueIds = [...new Set(ids)];
    return {
        type: 'ADD_SONG_IDS',
        ids: uniqueIds 
    }
}

export const fetchSavedSongs = (accessToken) => {

    console.log("reached");
    
    return dispatch => {

        const request = new Request(`http://localhost:5000/get_songs?token=${accessToken}`);

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            dispatch(addSavedSongs(res.items));
        }).catch(err => {
            console.log(err);
        });

    }
}

export const addSavedSongs = (songs) => {
    return {
        type: 'ADD_SAVED_SONGS',
        songs: songs 
    };
};

export const fetchSavedSongsError = (error) => {
    return {
        type: 'FETCH_SAVED_SONGS_ERROR'
    };
};

export const fetchSavedSongsPending = () => {
    return {
        type: 'FETCH_SAVED_SONGS_PENDING'
    };
};

export const getTopSongsGenres = (albumIds, accessToken) => {

    console.log("entered")
    
    console.log(albumIds);

        const request = new Request(`https://api.spotify.com/v1/albums/?ids=${albumIds}`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        return dispatch => {
            fetch(request).then(res => {
                res.json();
            }).then(items => {
                console.log(items);
            });
        }

}


