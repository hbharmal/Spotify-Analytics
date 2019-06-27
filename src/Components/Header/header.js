import React from 'react';
import { connect } from 'react-redux';
import  { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { fetchArtists } from '../../Actions/artistsAction';
import { fetchSongs } from '../../Actions/songsAction';

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
            this.props.fetchSongs(this.props.token, this.props.songsTimeRange);
            this.props.fetchArtists(this.props.token, this.props.artistsTimeRange);
        }
    }

    componentDidUpdate() {
        if (this.props.tokenSuccess) {
            this.props.fetchSongs(this.props.token, this.props.songsTimeRange);
            this.props.fetchArtists(this.props.token, this.props.artistsTimeRange);
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
        artistsTimeRange: state.artists.timeRange,
        songsTimeRange: state.songs.timeRange
    }
};

const mapDispatchToProps = dispatch => ({
    fetchArtists: (token, range) => dispatch(fetchArtists(token, range)),
    fetchSongs: (token, range) => dispatch(fetchSongs(token, range))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));