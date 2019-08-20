import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

import AnalysisButton from './analysis-button';
import Genres from './genresAnalysis/genres';
import Features from './songFeaturesAnalysis/features';

import { fetchSongFeaturesPending, fetchSongFeaturesComplete, fetchSongFeatures } from '../../Actions/analysisAction';

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

        if (this.props.fetchSongsComplete && !this.props.fetchSongFeaturesComplete) {
            const shortTermIds = this.props.shortTermSongs.map(song => song.id);
            const mediumTermIds = this.props.mediumTermSongs.map(song => song.id);
            const longTermIds = this.props.longTermSongs.map(song => song.id);

            this.props.fetchSongFeaturesPending();

            Promise.all([
                this.props.fetchSongFeatures(this.props.token, shortTermIds),
                this.props.fetchSongFeatures(this.props.token, mediumTermIds),
                this.props.fetchSongFeatures(tihs.props.token, longTermIds)
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
        fetchSongsComplete: state.songs.fetchSongsComplete,
        fetchSongFeaturesComplete: state.songFeaturesAnalysis.fetchSongFeaturesComplete,
        shortTermSongs: state.songs.shortTermSongList,
        mediumTermSongs: state.songs.mediumTermSongList,
        longTermSongs: state.songs.longTermSongsList,
        mode: state.analysis.mode,
        songFeatures: state.songFeaturesAnalysis.shortTermSongFeatures
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSongFeaturesPending: () => dispatch(fetchSongFeaturesPending()),
    fetchSongFeatures: (token, ids) => dispatch(fetchSongFeatures(token, ids)),
    fetchSongFeaturesComplete: () => dispatch(fetchSongFeaturesComplete())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AnalysisCard));