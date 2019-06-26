import React from 'react';
import { connect } from 'react-redux';
import  { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { fetchToken } from '../../Actions/tokenAction'; 
import { fetchArtists } from '../../Actions/artistsAction';
import { fetchSongs } from '../../Actions/songsAction';


const styles = theme => ({
    title: {
        color: "white",
        'text-align': "center", 
        'font-size': '32pt'
    
    }, 
    root: {
        backgroundColor: "grey", 
        height: '100px'
    }, 
    action: {
        display: 'flex',
    },
    button: {
        justifyContent: 'center',
        color: 'primary',
    }
});

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Spotilytics Application'
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        if (this.props.tokenSuccess) {
            this.props.fetchSongs(this.props.token);
            this.props.fetchArtists(this.props.token);
        }
    }

    componentDidUpdate() {
        if (this.props.tokenSuccess) {
            console.log("UPDATED");
            console.log(this.props.token);
            this.props.fetchSongs(this.props.token);
            this.props.fetchArtists(this.props.token);
        }
    }

    handleClick(e) {
        var token = this.props.fetchToken();
        console.log(token);
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card} >
                <CardContent>
                    <CardHeader
                        classes={{
                            title: classes.title,
                            root: classes.root,
                            action: classes.actions
                        }}
                        title={this.state.title}
                    />
                </CardContent>
                <CardActions classes={{
                    root: classes.button,
                    
                }}>
                    <Button variant="text" color="primary" backgroundcolor="grey"
                        onClick={this.handleClick}>
                        Log In With Spotify
                    </Button>
                </CardActions>
            </Card>
        ) 
    }

}

const mapStateToProps = state => {
    return {
        tokenSuccess: state.token.fetchTokenSuccess, 
        token: state.token.token
    }
};

const mapDispatchToProps = dispatch => ({
    fetchToken: () => dispatch(fetchToken()),
    fetchArtists: (token) => dispatch(fetchArtists(token)),
    fetchSongs: (token) => dispatch(fetchSongs(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));