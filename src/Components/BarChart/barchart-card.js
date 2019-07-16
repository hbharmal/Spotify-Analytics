import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

import AnalysisButton from './analysis-button';

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

class BarChartCard extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {

        if (this.props.fetchSongsSuccess) {
            const ids = this.props.songs.map(song => song.id);
            this.props.fetchSongFeatures(this.props.token, ids);
        }

        if (this.props.fetchSongFeaturesComplete) {
            console.log(this.props.fetchSongFeatures);
        }

    }

    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <CardHeader title="Music Analysis" className={classes.header} />
                <AnalysisButton />
            </Paper>
        )

    }
    
}

const mapStateToProps = state => {
    return {
        token: state.token.token,
        fetchSongsSuccess: state.songs.fetchSongsSuccess,
        songs: state.songs.shortTermSongList
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSongFeaturesPending: () => dispatch(fetchSongFeaturesPending()),
    fetchSongFeatures: (token, ids) => dispatch(fetchSongFeatures(token, ids)),
    fetchSongFeaturesComplete: () => dispatch(fetchSongFeaturesComplete())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BarChartCard));