import React from 'react';
import ArtistListItem from './artist-listitem.js';
import  { withStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    list: {
        overflow: 'auto',
        width: '50%',
        maxHeight: 600,
        margin: "20px 0px 0px 0px"
    }, 
    root: {
        width: '100%',
        maxWidth: 360,
    }
});

class Artists extends React.Component {

    constructor(props) {
        super(props);
    }

    createTable = () => { 
        let table = []   
        for (let i = 0; i < 20; i++) {
            table.push(<ArtistListItem />)
        }
        return table;
    }

    render() {

        const { classes } = this.props;
        
        return (
            <Paper className={classes.list}>
                <List className={classes.root}>
                    {this.createTable()}
                </List>
            </Paper>
        )
    }
}

export default withStyles(styles)(Artists);