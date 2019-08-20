import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

import AnalysisButton from './analysis-button';
import Genres from './genresAnalysis/genres';
import Features from './songFeaturesAnalysis/features';

import { fetchSongFeaturesPending, fetchSongFeaturesComplete, fetchSongFeatures } from '../../Actions/songFeaturesAnalysisAction';

const styles = theme => ({
    root: {
        overflow: 'auto',
        width: '100%',
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

        const conditions = this.props.shortTermSongs.length > 0 
                        && this.props.mediumTermSongs.length > 0
                        && this.props.longTermSongs.length > 0

        if (conditions && !this.props.songFeaturesComplete) {

            const shortTermIds = this.props.shortTermSongs.map(song => song.id);
            const mediumTermIds = this.props.mediumTermSongs.map(song => song.id);
            const longTermIds = this.props.longTermSongs.map(song => song.id);

            this.props.fetchSongFeaturesPending();
            Promise.all([
                this.props.fetchSongFeatures(this.props.token, shortTermIds, 0),
                this.props.fetchSongFeatures(this.props.token, mediumTermIds, 1),
                this.props.fetchSongFeatures(this.props.token, longTermIds, 2)
            ]).then(() => {
                this.props.fetchSongFeaturesComplete();
            });
            
        }  

    }

    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.root} style={{
                height: this.props.fetchTokenSuccess ? "600px" : "0px"
            }}>
                <CardHeader title="Music Analysis" className={classes.header} />
                <AnalysisButton />
                {this.props.mode == 0 ? <Genres /> : <Features />}
            </Paper>
        )

    }
    
}

const mapStateToProps = state => {
    return {
        token: state.token.token,
        fetchTokenSuccess: state.token.fetchTokenSuccess,
        songsComplete: state.songs.fetchSongsComplete,
        songFeaturesComplete: state.songFeaturesAnalysis.fetchSongFeaturesComplete,
        shortTermSongs: state.songs.shortTermSongList,
        mediumTermSongs: state.songs.mediumTermSongList,
        longTermSongs: state.songs.longTermSongList,
        mode: state.analysis.mode,
        songFeatures: state.songFeaturesAnalysis.shortTermSongFeatures
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSongFeaturesPending: () => dispatch(fetchSongFeaturesPending()),
    fetchSongFeatures: (token, ids, timePeriod) => dispatch(fetchSongFeatures(token, ids, timePeriod)),
    fetchSongFeaturesComplete: () => dispatch(fetchSongFeaturesComplete())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AnalysisCard));