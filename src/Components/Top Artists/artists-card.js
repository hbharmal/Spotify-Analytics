import React from 'react';
import { connect } from 'react-redux';
import ArtistListItem from './artist-listitem.js';
import  { withStyles } from '@material-ui/core/styles';
import  List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';

import RangeButton from './range-buttons-artist';
import { Button } from '@material-ui/core';

import { filterGenres } from '../../utils';

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
        this.state = {
            endIndex: 20,
            close: false,
            currentArtistItems: [] 
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.fetchArtistsSuccess) {

            let currentArtistItems = []
            if (this.props.timeRange == 0) {
                currentArtistItems = this.props.shortTermArtists
            } else if (this.props.timeRange == 1) {
                currentArtistItems = this.props.mediumTermArtists
            } else {
                currentArtistItems = this.props.longTermArtists
            } 
    
            // if the fetch is complete 
            if (!prevProps.fetchArtistsSuccess) {
                this.setState({
                    currentArtistItems: currentArtistItems
                });
            }  
    
            // if the time range has changed 
            if (prevProps.timeRange != this.props.timeRange) {
                this.setState({
                    currentArtistItems: currentArtistItems,
                    endIndex: 20, 
                    close: false  
                });
            }
            
        }
    }

    handleClick() {

        if (this.state.endIndex + 10 >= this.state.currentArtistItems.length) {
            this.setState({
                endIndex: this.state.currentArtistItems.length,
                close: true 
            });
        } else {
            this.setState({
                endIndex: this.state.endIndex + 10
            });
        }

    }

    render() {

        let slicedItems = this.state.currentArtistItems.slice(0, this.state.endIndex);

        const artistItems = slicedItems.map((artist, index) => (
            <ArtistListItem primaryText={artist.name} secondaryText={filterGenres(artist.genres).join(", ")} key={index} image={artist.images[0].url}></ArtistListItem>
        )); 


        const { classes } = this.props;
        
        return (
            <Paper className={classes.list}>
                <CardHeader title="Top Artists" style={{textAlign: 'center', backgroundColor: 'grey', position: 'sticky', top: 0, zIndex: 2}}/>
                <RangeButton />
                <List className={classes.root} style={{ width: '100%' }}>
                    {artistItems}
                </List>
                {this.props.fetchArtistsSuccess && !this.state.close && 
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
        shortTermArtists: state.artists.shortTermArtistList,
        mediumTermArtists: state.artists.mediumTermArtistList,
        longTermArtists: state.artists.longTermArtistList,
        timeRange: state.artists.timeRange,
        fetchArtistsSuccess: state.artists.fetchArtistsSuccess
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(Artists));
