import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

export default class SongListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ListItem key={this.props.key} style={{ width: '100%' }} >
                <Avatar src={this.props.image} style={{ borderRadius: 0, height: '100px', width: '100px', maxWidth: '100%', maxHeight: '100%'}}>
                </Avatar>
                <ListItemText primary={this.props.primaryText} secondary={this.props.secondaryText} />
            </ListItem>
        )
    }

        

}