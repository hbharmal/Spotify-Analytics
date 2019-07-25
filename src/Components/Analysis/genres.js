import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import GenreChart from './genre-chart';

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
            genrePercentages: {}
        }
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

            this.setState({
                genrePercentages: filteredDictArray,
                computedPercentages: true 
            });
        }
    }

    render() {

        const { classes } = this.props; 

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={9} style={{padding: '10px 5px 10px 10px'}}>
                        
                        {this.state.computedPercentages && <GenreChart genres={this.state.genrePercentages}/>}
                    
                    </Grid>
                    <Grid item xs={12} sm={3} style={{padding: '10px 10px 10px 5px'}}>

                        <Paper>
                            Hello World
                        </Paper>

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
