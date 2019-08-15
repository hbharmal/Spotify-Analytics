import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Description from './description';
import PercentageCircle from './percentage-circle';
import SongsCircle from './songs-circle';
import Title from './title';
import TopArtists from './top-artists';

export class GenreDescription extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Paper style={{height: 500}}>
                <Grid container direction="column" style={{height: '100%', width: '100%'}} >
                        <Grid item xs={4} style={{maxWidth: 'none'}}>
                            <Grid container direction="row" style={{height: '100%'}} >
                                { /* This will have 3 things: the percentage, the title, and the number of songs in the saved songs list*/}
                                <Grid item xs={4} style={{padding: '10px 10px 10px 10px'}}>
                                    <PercentageCircle 
                                        percentage={this.props.topArtists[this.props.genre].percentage}
                                    />
                                </Grid>
                                <Grid item xs={4} style={{padding: '10px 10px 10px 0px'}} >
                                    <Title 
                                        title={this.props.topArtists[this.props.genre].genreName}
                                    />
                                </Grid>
                                <Grid item xs={4} style={{padding: '10px 10px 10px 0px'}}>
                                    <SongsCircle 
                                        numSongs={144}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8} style={{maxWidth: 'none'}}>
                            <Grid container direction="row" style={{height: '100%'}} >
                                <Grid item xs={6} style={{padding: '0px 10px 10px 10px', width: '100%'}}>
                                    <Description />
                                </Grid>
                                <Grid item xs={6} style={{padding: '0px 10px 10px 0px', width: '100%'}}>
                                    <TopArtists 
                                        artists={this.props.topArtists[this.props.genre].topArtists}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                </Grid>
            </Paper>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        topArtists: state.genreAnalysis.topArtists
    };
};

export default connect(mapStateToProps, null)(GenreDescription);