import React from 'react';
import { connect } from 'react-redux';
import  { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { fetchArtists, fetchArtistsPending, fetchArtistsComplete } from '../../Actions/artistsAction';
import { fetchSongs, fetchSongsPending, fetchSongsComplete } from '../../Actions/songsAction';

import LoginButton from './login-button'

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
});

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Spotilytics Application'
        }
    }

    componentWillMount() {

        if (this.props.tokenSuccess) {
            this.props.fetchArtistsPending();
            this.props.fetchSongsPending();
            Promise.all([
                this.props.fetchArtists(this.props.token, 0),
                this.props.fetchArtists(this.props.token, 1),
                this.props.fetchArtists(this.props.token, 2),
                this.props.fetchSongs(this.props.token, 0),
                this.props.fetchSongs(this.props.token, 1),
                this.props.fetchSongs(this.props.token, 2)
            ]).then(() => {
                this.props.fetchArtistsComplete();
                this.props.fetchSongsComplete();
            })
        }

    }

    componentDidUpdate() {

        if (this.props.tokenSuccess) {
            this.props.fetchArtistsPending();
            this.props.fetchSongsPending();
            Promise.all([
                this.props.fetchArtists(this.props.token, 0),
                this.props.fetchArtists(this.props.token, 1),
                this.props.fetchArtists(this.props.token, 2),
                this.props.fetchSongs(this.props.token, 0),
                this.props.fetchSongs(this.props.token, 1),
                this.props.fetchSongs(this.props.token, 2)
            ]).then(() => {
                this.props.fetchArtistsComplete();
                this.props.fetchSOngsComplete();
            })
        }

    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card} >
                <CardContent style={{padding: '0 0 10px 0'}}>
                    <CardHeader
                        classes={{
                            title: classes.title,
                            root: classes.root,
                            action: classes.actions
                        }}
                        title={this.state.title}
                    />
                </CardContent>
                <CardActions style={{justifyContent: 'center', padding: '0 0 0 0'}}>
                    <LoginButton />
                </CardActions>
            </Card>
        ) 
    }

}

const mapStateToProps = state => {
    return {
        tokenSuccess: state.token.fetchTokenSuccess, 
        token: state.token.token,
    }
};

const mapDispatchToProps = dispatch => ({
    fetchArtistsPending: () => dispatch(fetchArtistsPending()),
    fetchSongsPending: () => dispatch(fetchSongsPending()),
    fetchArtists: (token, range) => dispatch(fetchArtists(token, range)),
    fetchSongs: (token, range) => dispatch(fetchSongs(token, range)),
    fetchArtistsComplete: () => dispatch(fetchArtistsComplete()),
    fetchSongsComplete: () => dispatch(fetchSongsComplete())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));