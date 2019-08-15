import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import GenreChart from './genre-chart';
import GenreList from './genres-list';
import GenreDescription from './genreDescriptiona/genre-description';

import { computeGenrePercentages } from '../../utils';

import { setTopGenres, setTopArtists } from '../../Actions/genreAnalysisAction';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
})

export class Genres extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            computedPercentages: false,
            genrePercentages: [],
            genreItems: [],
            colors: []
        };
    }

    componentDidUpdate() {
        if (!this.state.computedPercentages && this.props.uniqueGenres.length > 0) {
            const dictArray = computeGenrePercentages(this.props.uniqueGenres);
            let filteredDictArray = [];
            let others = [];
            if (dictArray.length > 6) {
                let otherCount = 0;
                const difference = dictArray.length - 6;
                for (let i = 0; i < difference; i++) {
                    otherCount += dictArray[i].count;
                    others.push(dictArray[i]);
                }
                filteredDictArray = dictArray.slice(difference, dictArray.length);
                filteredDictArray.map(object => {
                    if (object.genre == "other") {
                        object.count += otherCount;
                    }
                });
            } else {
                filteredDictArray = dictArray;
            }

            let totalCount = 0;
            filteredDictArray.map(object => {
                totalCount += object.count;
            });

            const blue = "#4FC2D7";
            const green = "#54C88F";
            const lightBrown = "#FFF8DC";
            const pink = "#E49CDA";
            const lightGreen = "#7CC29C";
            const white = "#9CBAA8";

            const colors = [blue, green, lightBrown, pink, lightGreen, white];

            const genreItemsDictArray = filteredDictArray.map((object, index) => {
                if (object.genre === "other") {
                    return {genreName: object.genre, color: colors[index], percentage: Math.round(object.count / totalCount * 100), count: object.count, genres: others}
                } else {
                    return {genreName: object.genre, color: colors[index], percentage: Math.round(object.count / totalCount * 100), count: object.count, genres: null}
                }
            });

            this.props.setTopGenres(genreItemsDictArray);
            this.props.setTopArtists(genreItemsDictArray, this.props.topArtistGenres);
            
            this.setState({
                genrePercentages: filteredDictArray,
                computedPercentages: true,
                genreItems: genreItemsDictArray,
                colors: colors 
            });
        }

    }

    render() {

        const { classes } = this.props; 

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={8} style={{padding: '10px 5px 10px 10px'}}>
                        
                        {   this.state.computedPercentages 
                        && (this.props.currentGenre > 10)  
                        &&  <GenreChart genres={this.state.genrePercentages} colors={this.state.colors}/> }
        
    
                        {   this.state.computedPercentages 
                        && (this.props.currentGenre < 10) 
                        &&  <GenreDescription genre={this.props.currentGenre} counts={this.props.genreSongCount}/>}
                    
                    </Grid>
                    <Grid item xs={12} sm={4} style={{padding: '10px 10px 10px 5px'}}>

                        {this.state.computedPercentages && <GenreList genres={this.state.genreItems}/>}

                    </Grid>

                </Grid>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        uniqueGenres: state.artists.artistGenres,
        topArtistGenres: state.artists.topArtistGenres,
        currentGenre: state.genreAnalysis.currentGenre,
        genreSongCount: state.songs.genreSongCount
    };
};

const mapDispatchToProps = dispatch => ({
    setTopGenres: (genres) => dispatch(setTopGenres(genres)),
    setTopArtists: (genres, artists) => dispatch(setTopArtists(genres, artists))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Genres));
