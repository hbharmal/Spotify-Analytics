import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import GenreChart from './genre-chart';
import GenreList from './genres-list';

import { computeGenrePercentages } from '../../utils';

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
            if (dictArray.length > 6) {
                let otherCount = 0;
                const difference = dictArray.length - 6;
                for (let i = 0; i < difference; i++) {
                    otherCount += dictArray[i].count;
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

            const blue = "#4FC2D7";
            const green = "#54C88F";
            const lightBrown = "#D5AD79";
            const pink = "#E49CDA";
            const lightGreen = "#7CC29C";
            const white = "#9CBAA8";

            const colors = [blue, green, lightBrown, pink, lightGreen, white];

            const genreItemsDictArray = filteredDictArray.map((object, index) => {
                return {genreName: object.genre, color: colors[index]}
            });
            

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
                        
                        {this.state.computedPercentages && <GenreChart genres={this.state.genrePercentages} colors={this.state.colors}/>}
                    
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
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(Genres));
