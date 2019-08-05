import { doesNotReject } from "assert";

export const fetchUserinfoPending = () => {
    return {
        type: 'FETCH_USER_PENDING'
    };
};

export const fetchUserinfoComplete = () => {
    return {
        type: 'FETCH_USER_COMPLETE'
    };
};

export const fetchUserinfoSuccess = (userinfo) => {
    return {
        type: 'FETCH_USER_SUCCESS',
        info: userinfo
    };
};

export const fetchUserinfoError = () => {
    return {
        type: 'FETCH_USER_ERROR'
    };
};

export const fetchUserinfo = (accessToken) => {

    return dispatch => {
        const request = new Request('https://api.spotify.com/v1/me', {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        fetch(request).then(res => {
            return res.json();
        }).then(data => {
            dispatch(fetchUserinfoSuccess(data));
        }).catch(err => {
            dispatch(fetchUserinfoError(err));
        })
    };

}