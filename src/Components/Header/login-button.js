import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { fetchToken } from '../../Actions/tokenAction'; 

const styles = theme => ({
    root: {
        margin: '0px 0px 10px 0px',
        justifyContent: 'center'
    }
});

class LoginButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(e) {
        var token = this.props.fetchToken();
        console.log(token);
    }

    render() {

        const { classes } = this.props;

        return (
            <Button 
                variant="contained" 
                color="primary" 
                className={classes.root}
                onClick={this.handleClick}
            > Log In with Spotify </Button>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchToken: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(LoginButton));