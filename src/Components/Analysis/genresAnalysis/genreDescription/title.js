import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: '100%',
        height: '50%',
        borderRadius: '30px',
        borderStyle: 'double',
        borderColor: 'blue',
        borderWidth: '5px'
    },
    typography: {
        padding: '20px'
    }
})

export class Title extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { classes } = this.props;

        const cleanedTitle = this.props.title.slice(0, 1).toUpperCase() + this.props.title.slice(1);

        return (
            <div className={classes.root}>
                <Card className={classes.card} style={{background: this.props.color}}>
                        <Typography align="center" variant="h6" className={classes.typography} >
                            {cleanedTitle}
                        </Typography>
                </Card>
            </div>
        )


    }
}

export default withStyles(styles)(Title);