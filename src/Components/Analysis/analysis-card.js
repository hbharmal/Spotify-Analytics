import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AnalysisButton from './analysis-button';
import Genres from './genres';

import { fetchSongFeaturesPending, fetchSongFeaturesComplete, fetchSongFeatures } from '../../Actions/songFeaturesAction';

const styles = theme => ({
    root: {
        overflow: 'auto',
        width: '100%',
        maxHeight: 600,
        margin: '10px 0px 0px 0px'
    },
    header: {
        textAlign: 'center',
        backgroundColor: 'grey',
        position: 'sticky',
        top: 0,
        zIndex: 2
    }
});

class AnalysisCard extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {

        if (this.props.fetchSongsComplete && !this.props.fetchSongFeaturesComplete) {
            const ids = this.props.songs.map(song => song.id);
            Promise.all([
                this.props.fetchSongFeatures(this.props.token, ids),
            ]).then(() => {
                this.props.fetchSongFeaturesComplete;
            });
            
        }  

    }

    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <CardHeader title="Music Analysis" className={classes.header} />
                <AnalysisButton />
                <Genres />
            </Paper>
        )

    }
    
}

const mapStateToProps = state => {
    return {
        token: state.token.token,
        fetchSongsComplete: state.songs.fetchSongsComplete,
        fetchSongFeaturesComplete: state.songFeatures.fetchSongFeaturesComplete,
        songs: state.songs.shortTermSongList,
        songFeatures: state.songFeatures.songFeatures
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSongFeaturesPending: () => dispatch(fetchSongFeaturesPending()),
    fetchSongFeatures: (token, ids) => dispatch(fetchSongFeatures(token, ids)),
    fetchSongFeaturesComplete: () => dispatch(fetchSongFeaturesComplete())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AnalysisCard));