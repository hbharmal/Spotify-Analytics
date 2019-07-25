import { rangeToString, filterGenres } from '../utils';

export const fetchArtistsPending = () => {
    return {
        type: 'FETCH_ARTISTS_PENDING'
    };
};

export const fetchArtistsComplete = () => {
    return {
        type: 'FETCH_ARTISTS_COMPLETE'
    }
}

export const fetchShortTermArtistsSuccess = (artists) => {
    return {
        type: 'FETCH_SHORT_TERM_ARTISTS_SUCCESS',
        artists: artists
    }
}

export const fetchMediumTermArtistsSuccess = (artists) => {
    return {
        type: 'FETCH_MEDIUM_TERM_ARTISTS_SUCCESS',
        artists: artists
    }
}

export const fetchLongTermArtistsSuccess = (artists) => {
    return {
        type: 'FETCH_LONG_TERM_ARTISTS_SUCCESS',
        artists: artists
    }
}

export const fetchArtistsError = () => {
    return {
        type: 'FETCH_ARTISTS_ERROR'
    };
};

export const fetchArtists = (accessToken, range) => {

    const rangeString = rangeToString(range);

    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/me/top/artists?time_range=${rangeString}&limit=50`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            if (range == 0) {
                dispatch(fetchShortTermArtistsSuccess(res.items));
            } else if (range == 1) {
                dispatch(fetchMediumTermArtistsSuccess(res.items));
            } else if (range == 2) {
                dispatch(fetchLongTermArtistsSuccess(res.items));
            }
        }).catch(err => {
            dispatch(fetchArtistsError(err));
        });
    };
};


// Change time range for top artists
export const changeTimeRangeArtists = (range) => {
    return {
        type: 'CHANGE_TIME_RANGE_ARTISTS',
        range: range 
    }
}

// Add artists IDS to redux store for future processing 
export const addArtistIds = (ids) => {
    var uniqueIds = [...new Set(ids)];
    return {
        type: 'ADD_ARTIST_IDS',
        ids: uniqueIds  
    }
}

// Add the genres to the redux store (needed for chart)
export const addArtistGenres = (artists) => {
    // console.log(artists.map(artist => artist.name));
    // let a = []
    const uniqueGenres = Array.from(new Set(artists.map(artist => artist.id)))
        .map(id => {
            return artists.find(artist => artist.id === id)
        }).map(artist => {
            // a.push(artist);
            return artist.genres
        });
        // }).map(genre => {
        //     return filterGenres(genre);
        // });
    // console.log(a.map(artist => artist.name))
    return {
        type: 'ADD_ARTIST_GENRES',
        genres: uniqueGenres
    }
}
