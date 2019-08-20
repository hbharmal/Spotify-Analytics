import { CLIENT_ID, CLIENT_SECRET } from '../globals';

export const fetchToken = () => {

    var url = new URL('https://accounts.spotify.com/authorize');
    url.searchParams.append('client_id', CLIENT_ID);
    url.searchParams.append('client_secret', CLIENT_SECRET);
    url.searchParams.append('scope', 'user-top-read user-read-private user-read-email user-read-birthdate');
    url.searchParams.append('response_type', 'token');
    url.searchParams.append('redirect_uri', 'http://localhost:8080');

    return dispatch => {

        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        if (!hashParams.access_token) {
            window.location.href = url;
        }

        dispatch(setToken(hashParams.access_token));
    }
}

export const fetchTokenError = () => {
    return {
        type: 'FETCH_TOKEN_ERROR'
    };
}


export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        token: token
    };
}