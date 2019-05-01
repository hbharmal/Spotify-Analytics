import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

export default class ArtistListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "text": "THIS IS A SAMPLE TEXT"
        }
    }

    render() {

        return (
            <ListItem>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                <ListItemText primary={this.state.text} />
            </ListItem>
        )
    }

        

}