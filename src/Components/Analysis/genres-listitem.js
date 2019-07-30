import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        borderRadius: '10px',

    }
});

class GenreListItem extends React.Component {

    render() {

        const { classes } = this.props;

        const filteredName = this.props.genreName.slice(0, 1).toUpperCase() + this.props.genreName.slice(1);
    
        return (
            <div style={{padding: "0px 5px 15px 5px", margin: "0px"}}>
            <Card className={classes.root} raised={true} style={{backgroundColor: this.props.color, padding: "0px", height: `${(500 / 6) - 15}px`}}>
                <CardContent  >
                    <Typography align="center" variant="h6">
                            {filteredName}
                    </Typography>
                </CardContent>
            </Card>
            </div>
        )
    }

}

export default withStyles(styles)(GenreListItem);