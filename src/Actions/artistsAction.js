import { rangeToString } from '../utils';

export const fetchArtistsPending = () => {
    return {
        type: 'FETCH_ARTISTS_PENDING'
    };
};

export const fetchArtistsSuccess = (artists) => {
    return {
        type: 'FETCH_ARTISTS_SUCCESS', 
        artists: artists
    };
};

export const fetchArtistsError = () => {
    return {
        type: 'FETCH_ARTISTS_ERROR'
    };
};

export const fetchArtists = (accessToken, range) => {

    const rangeString = rangeToString(range);

    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/me/top/artists?time_range=${rangeString}`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        dispatch(fetchArtistsPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            dispatch(fetchArtistsSuccess(res.items));
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
