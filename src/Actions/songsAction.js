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
    
    return dispatch => {

        // const request = new Request(`http://localhost:5000/get_songs?token=${accessToken}`);

        // fetch(request).then(res => {
        //     return res.json();
        // }).then(res => {
        //     console.log("DONE!!")
        //     const result = Object.keys(res).map(key => {
        //         return {"name": key, "count": res[key]}
        //     });
        //     dispatch(addSavedSongs(result));
        // }).catch(err => {
        //     console.log(err);
        // });

        const fakeAPI = {
            "alternative": 34,
            "anime": 243,
            "blues": 3,
            "children": 4,
            "classical": 1,
            "comedy": 24,
            "country": 234,
            "dance": 2,
            "easy listening": 5,
            "electronic": 4,
            "folk": 4,
            "hip hop": 5,
            "holiday": 3,
            "international": 2,
            "jazz": 4,
            "rap": 5,
            "holiday": 6,
            "indie": 6,
            "instrumental": 6,
            "latin": 6,
            "new age": 6,
            "opera": 6,
            "pop": 6,
            "rnb": 6,
            "rock": 6,
            "trap": 6,
            "sleep": 6, 
            "other": 6
        }

        const result = Object.keys(fakeAPI).map(key => {
            return {"name": key, "count": fakeAPI[key]}
        });
        dispatch(addSavedSongs(result));
    }
}

export const addSavedSongs = (items) => {
    return {
        type: 'ADD_SAVED_SONGS',
        songsCount: items 
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

// export const getTopSongsGenres = (albumIds, accessToken) => {

//         const request = new Request(`https://api.spotify.com/v1/albums/?ids=${albumIds}`, {
//             headers: new Headers({
//                 'Authorization': 'Bearer ' + accessToken
//             })
//         });

//         return dispatch => {
//             // fetch(request).then(res => {
//             //     res.json();
//             // }).then(items => {
//             //     console.log(items);
//             // });
//         }

// }


