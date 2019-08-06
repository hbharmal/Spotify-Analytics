import React from 'react';
import { connect } from 'react-redux';

import GenreListItem from './genres-listitem';



export class GenreList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let genreListItems = []

        // const otherIndex = 0;
        // this.props.genreListItems.map((object, index) => {
        //     if (object.genreName.equals("other")) { otherIndex = index; }
        // });
        

        this.props.genres.map((object, index) => {
            genreListItems.push(<GenreListItem genreName={object.genreName} color={object.color} myKey={index} hovered={index == this.props.index ? true : false} percentage={object.percentage}></GenreListItem>);
        });

        // // reindex genreListItems 
        // const temp = genreListItems[otherIndex];
        

        return (
            <div style={{maxHeight: 650}}>
                {genreListItems}
            </div>
        )

    }

}

const mapStateToProps = state => {
    return {
        index: state.songFeatures.hoveredIndex
    }
}

export default connect(mapStateToProps, null)(GenreList);