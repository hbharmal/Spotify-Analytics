import React from 'react';
import { connect } from 'react-redux';
import SongListItem from './song-listitem.js';
import  { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
    list: {
        overflow: 'auto',
        width:   '50%',
        maxHeight: 600,
        margin: "10px 0px 0px 10px"
    }, 
    root: {
        width: '100%',
        maxWidth: 360,
    }
});

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            songItems: []
        }
    }

    componentDidUpdate() {
        console.log(this.props.songs);
        if (this.props.fetchSongsSuccess) {
            this.state.songItems = this.props.songs.map(song => (
                <SongListItem text={song.name}></SongListItem>
            ));
        }
    }

    createTable = () => { 
        let table = []   
        for (let i = 0; i < 20; i++) {
            table.push(< SongListItem />)
        }
        return table;
    }

    render() {

        const { classes } = this.props;
        
        return (
            <Paper className={classes.list}>
                <CardHeader title="Songs" style={{textAlign: 'center', backgroundColor: 'grey'}}/>
                <List className={classes.root}>
                    {this.props.fetchSongsSuccess && this.state.songItems}
                </List>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songs: state.songs.songsList,
        fetchSongsSuccess: state.songs.fetchSongsSuccess
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(Songs));