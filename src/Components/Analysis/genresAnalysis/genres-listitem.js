import React from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { setHoveredIndex } from '../../../Actions/analysisAction';
import { setCurrentGenre } from '../../../Actions/genreAnalysisAction';

const styles = theme => ({
    root: {
        borderRadius: '10px',
    }
});

class GenreListItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseClick = this.handleMouseClick.bind(this);
    }

    handleMouseEnter(index) {
        this.props.setHoverIndex(index);
    }

    handleMouseLeave() {
        this.props.setHoverIndex(null);
    }

    handleMouseClick(index) {
        this.props.setCurrentGenre(index);
    }

    render() {

        const { classes } = this.props;

        const filteredName = this.props.genreName.slice(0, 1).toUpperCase() + this.props.genreName.slice(1);

        const radius = 20;
        const circumference = radius * 2 * Math.PI;
        const offset = (circumference - ((this.props.percentage / 100) * circumference));

        return (
            <div style={{padding: "0px 5px 15px 5px", margin: "0px"}} >
                <Card className={classes.root} raised={false} style={{
                    backgroundColor: this.props.color,
                    opacity: this.props.currentGenre < 100 && (this.props.currentGenre != this.props.myKey) ? "0.4" : null ,
                    padding: "0px",
                    height: `${(500 / 6) - 15}px`,
                    borderColor: this.props.hovered || this.props.currentGenre == this.props.myKey ? "#C43a31" : null,
                    borderRadius: this.props.hovered || this.props.currentGenre == this.props.myKey ? 5 : null,
                    borderWidth: this.props.hovered || this.props.currentGenre == this.props.myKey ? "5px" : null,
                    border: this.props.hovered || this.props.currentGenre == this.props.myKey ? "solid" : null 

                }}>
                    <ButtonBase style={{width: '100%', height: '100%'}} 
                                onMouseEnter={() => this.handleMouseEnter(this.props.myKey)} 
                                onMouseLeave={() => this.handleMouseLeave()} 
                                onClick={() => this.handleMouseClick(this.props.myKey)}
                                >
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                            <div style={{justifyContent: 'flex-end', alignItems: 'center', width: '60%'}}>
                                <CardContent >
                                    <Typography align="right" variant="h6">
                                            {filteredName}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div style={{justifyContent: 'flex-start', alignSelf: 'center', width: '40%'}}>
                                <svg width="50px" height="50px" style={{display:"block", margin:"0 auto"}}>
                                    <circle cx="25" cy="25" r="20" 
                                        style={{
                                            fill: this.props.color,
                                            strokeWidth: "3",
                                            stroke: "#CFCFCF"
                                        }}
                                    />
                                    <circle cx="25" cy="25" r="20" transform="rotate(-90 25 25)"
                                        style={{
                                            fill: this.props.color,
                                            strokeWidth: "4",
                                            stroke: "#BA0000",
                                            strokeDasharray: `${circumference} ${circumference}`,
                                            strokeDashoffset: offset,
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'round'
                                        }}
                                    />
                                    <text x="50%" y="50%" textAnchor="middle" dy="0.3em">
                                        {this.props.percentage}%
                                        
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </ButtonBase>
                </Card>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentGenre: state.genreAnalysis.currentGenre 
    };
};

const mapDispatchToProps = (dispatch) => ({
    setHoverIndex: (index) => dispatch(setHoveredIndex(index)),
    setCurrentGenre: (index) => dispatch(setCurrentGenre(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GenreListItem));