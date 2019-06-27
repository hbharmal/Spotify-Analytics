import React from 'react';
import { connect } from 'react-redux';
import SongListItem from './song-listitem.js';
import  { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';

import RangeButton from './range-button-songs';

const styles = theme => ({
    list: {
        overflow: 'auto',
        width:   '50%',
        maxHeight: 600,
        margin: "10px 0px 0px 10px"
    }, 
    root: {
        width: '100%',
    }
});

class Songs extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const songItems = this.props.songs.map((song, index) => (
            <SongListItem text={song.name} key={index} image={song.album.images[0].url}></SongListItem>
        ));

        const { classes } = this.props;
        
        return (
            <Paper className={classes.list}>
                <CardHeader title="Top Songs" style={{textAlign: 'center', backgroundColor: 'grey', position: 'sticky', top: 0, zIndex: 2}}/>
                <RangeButton />
                <List className={classes.root} style={{ width: '100%' }}>
                    {songItems}
                </List>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songs: state.songs.songsList,
        fetchSongsSuccess: state.songs.fetchSongsSuccess
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(Songs));