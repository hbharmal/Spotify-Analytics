import React from 'react';

import Paper from '@material-ui/core/Paper';

import GenreListItem from './genres-listitem';

export class GenreList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let genreListItems = []

        this.props.genres.map((object, index) => {
            genreListItems.push(<GenreListItem genreName={object.genreName} color={object.color} key={index}></GenreListItem>);
        });

        return (
            <div style={{maxHeight: 650}}>
                {genreListItems}
            </div>
        )

    }

}

export default GenreList;