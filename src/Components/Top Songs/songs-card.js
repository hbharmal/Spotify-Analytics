import React from 'react';
import { connect } from 'react-redux';
import SongListItem from './song-listitem.js';
import  { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

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
        this.state = {
            endIndex: 20,
            close: false,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps, prevStae) {

        if (this.props.fetchSongsComplete) {

            if (prevProps.timeRange  != this.props.timeRange) {
                this.setState({
                    endIndex: 20, 
                    close: false 
                });
            }

        }
        

    }

    handleClick() {

        let currentSongItems = []

        if (this.props.timeRange == 0) {
            currentSongItems = this.props.shortTermSongs
        } else if (this.props.timeRange == 1) {
            currentSongItems = this.props.mediumTermSongs
        } else {
            currentSongItems = this.props.longTermSongs
        }

        if (this.state.endIndex + 10 >= currentSongItems.length) {
            this.setState({
                endIndex: currentSongItems.length,
                close: true 
            });
        } else {
            this.setState({
                endIndex: this.state.endIndex + 10
            });
        }


    }

    render() {

        let currentSongItems = []

        if (this.props.timeRange == 0) {
            currentSongItems = this.props.shortTermSongs
        } else if (this.props.timeRange == 1) {
            currentSongItems = this.props.mediumTermSongs
        } else {
            currentSongItems = this.props.longTermSongs
        }
    
        currentSongItems = currentSongItems.slice(0, this.state.endIndex);

        const songItems = currentSongItems.map((song, index) => (
            <SongListItem primaryText={song.name} secondaryText={song.artists.map(artist => artist.name).join(", ")} key={index} image={song.album.images[0].url}></SongListItem>
        ));

        const { classes } = this.props;
        
        return (
            <Paper className={classes.list}>
                <CardHeader title="Top Songs" style={{textAlign: 'center', backgroundColor: 'grey', position: 'sticky', top: 0, zIndex: 2}}/>
                <RangeButton />
                <List className={classes.root} style={{ width: '100%' }}>
                    {songItems}
                </List>
                {this.props.fetchSongsComplete && !this.state.close &&
                    <Button variant="contained" style={{ justifyContent: 'center', textAlign: 'center', width:'100%', borderRadius: '0px 0px 4px 4px'}} onClick={this.handleClick}>
                        Show More
                    </Button>
                }
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shortTermSongs: state.songs.shortTermSongList,
        mediumTermSongs: state.songs.mediumTermSongList,
        longTermSongs: state.songs.longTermSongList,
        timeRange: state.songs.timeRange,
        fetchSongsComplete: state.songs.fetchSongsComplete
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(Songs));