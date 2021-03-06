import React from 'react';
import { connect } from 'react-redux';
import  { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { fetchArtists, fetchArtistsPending, fetchArtistsComplete } from '../../Actions/artistsAction';
import { fetchSongs, fetchSongsPending, fetchSongsComplete, addSongIds, fetchSavedSongs } from '../../Actions/songsAction';
import { fetchUserinfo, fetchUserinfoPending, fetchUserinfoComplete } from '../../Actions/userinfoAction';

import LoginButton from './login-button'
import { Typography } from '@material-ui/core';

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
            title: 'Spotilytics Application',
            addedSongIds: false 
        }
    }

    componentWillMount() {

        if (this.props.tokenSuccess) {
            this.props.fetchArtistsPending();
            this.props.fetchSongsPending();
            this.props.fetchArtistsPending();
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
                this.props.fetchUserinfoComplete();
            })
        }

    }

    componentDidUpdate() {
        
        if (this.props.tokenSuccess && !this.props.apicomplete) {
            this.props.fetchArtistsPending();
            this.props.fetchSongsPending();
            this.props.fetchArtistsPending();
            Promise.all([
                this.props.fetchArtists(this.props.token, 0),
                this.props.fetchArtists(this.props.token, 1),
                this.props.fetchArtists(this.props.token, 2),
                this.props.fetchSongs(this.props.token, 0),
                this.props.fetchSongs(this.props.token, 1),
                this.props.fetchSongs(this.props.token, 2),
                this.props.fetchUserinfo(this.props.token),
                this.props.fetchSavedSongs(this.props.token)
            ]).then(() => {
                this.props.fetchArtistsComplete();
                this.props.fetchSongsComplete();
                this.props.fetchUserinfoComplete();
            })
        }

        const conditions = this.props.shortTermSongs.length > 0 
            && this.props.mediumTermSongs.length > 0 
            && this.props.longTermSongs.length > 0         

        if (this.props.apicomplete && !this.state.addedSongIds && conditions) {
            const allSongs = [...this.props.shortTermSongs, ...this.props.mediumTermSongs, ...this.props.longTermSongs];
            const allIds = allSongs.map(song => song.id);
            this.props.addSongIds(allIds);
            this.setState({
                addedSongIds: true
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
                {!this.props.tokenSuccess && 
                    <CardActions style={{justifyContent: 'center', padding: '0 0 0 0'}}>
                        <LoginButton />
                    </CardActions>
                }
                {this.props.apicomplete && 
                    <Typography style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', fontSize: 25, padding: '0px 0px 10px 0px'}}>
                      Welcome {this.props.userinfo.display_name}!
                    </Typography>
                }
            </Card>
        ) 
    }

}

const mapStateToProps = state => {
    return {
        tokenSuccess: state.token.fetchTokenSuccess, 
        token: state.token.token,
        userinfo: state.user.information,
        apicomplete: state.artists.fetchArtistsComplete,
        shortTermSongs: state.songs.shortTermSongList,
        mediumTermSongs: state.songs.mediumTermSongList,
        longTermSongs: state.songs.longTermSongList
    };
};

const mapDispatchToProps = dispatch => ({
    fetchArtistsPending: () => dispatch(fetchArtistsPending()),
    fetchSongsPending: () => dispatch(fetchSongsPending()),
    fetchArtists: (token, range) => dispatch(fetchArtists(token, range)),
    fetchSongs: (token, range) => dispatch(fetchSongs(token, range)),
    fetchArtistsComplete: () => dispatch(fetchArtistsComplete()),
    fetchSongsComplete: () => dispatch(fetchSongsComplete()),
    fetchUserinfoPending: () => dispatch(fetchUserinfoPending()),
    fetchUserinfo: (token) => dispatch(fetchUserinfo(token)),
    fetchUserinfoComplete: () => dispatch(fetchUserinfoComplete()),
    addSongIds: (ids) => dispatch(addSongIds(ids)),
    fetchSavedSongs: (token) => dispatch(fetchSavedSongs(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));