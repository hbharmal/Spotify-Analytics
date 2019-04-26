import React from 'react';
import  { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
    title: {
        color: "white",
        'text-align': "center", 
        'font-size': '32pt'
    
    }, 
    root: {
        backgroundColor: "grey", 
        height: '100px'
    }, 
    action: {
        display: 'flex',
    }
});

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Spotilytics Application'
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <CardHeader
                classes={{
                    title: classes.title,
                    root: classes.root,
                    action: classes.actions
                }}
                title={this.state.title}
            />
        );
    }

}

export default withStyles(styles)(Header);