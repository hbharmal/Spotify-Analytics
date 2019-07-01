import React from 'react';
import { connect } from 'react-redux';
import ArtistListItem from './artist-listitem.js';
import  { withStyles } from '@material-ui/core/styles';
import  List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';

import RangeButton from './range-buttons-artist';

const styles = theme => ({
    list: {
        overflow: 'auto',
        width: '50%',
        maxHeight: 600,
        margin: "10px 10px 0px 0px",
    }, 
    root: {
        width: '100%',
    }
});

class Artists extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let currentArtistItems = []

        if (this.props.timeRange == 0) {
            currentArtistItems = this.props.shortTermArtists
        } else if (this.props.timeRange == 1) {
            currentArtistItems = this.props.mediumTermArtists
        } else {
            currentArtistItems = this.props.longTermArtists
        }   


        const artistItems = currentArtistItems.map((artist, index) => (
            <ArtistListItem text={artist.name} key={index} image={artist.images[0].url}></ArtistListItem>
        )); 


        const { classes } = this.props;
        
        return (
            <Paper className={classes.list}>
                <CardHeader title="Top Artists" style={{textAlign: 'center', backgroundColor: 'grey', position: 'sticky', top: 0, zIndex: 2}}/>
                <RangeButton />
                <List className={classes.root} style={{ width: '100%' }}>
                    {artistItems}
                </List>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shortTermArtists: state.artists.shortTermArtistList,
        mediumTermArtists: state.artists.mediumTermArtistList,
        longTermArtists: state.artists.longTermArtistList,
        timeRange: state.artists.timeRange,
        fetchArtistsSuccess: state.artists.fetchArtistsSuccess
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(Artists));
