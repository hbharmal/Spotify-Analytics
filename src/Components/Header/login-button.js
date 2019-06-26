import React from 'react';
import Button from '@material-ui/core/Button';

class LoginButton extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Button> Log In with Spotify</Button>
        )

    }

}

export default LoginButton;