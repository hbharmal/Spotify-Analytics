import React from 'react';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        overflow: 'auto',
        width: '100%',
        maxHeight: 600,
        margin: '10px 0px 0px 0px'
    },
    header: {
        textAlign: 'center',
        backgroundColor: 'grey',
        position: 'sticky',
        top: 0,
        zIndex: 2
    }
});

class BarChartCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { classes } = this.props;

        console.log(classes);

        return (
            <Paper className={classes.root}>
                <CardHeader title="Music Analysis" className={classes.header} />
            </Paper>
        )

    }
    
}

export default withStyles(styles)(BarChartCard);