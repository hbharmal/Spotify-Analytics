import React from 'react';

import Paper from '@material-ui/core/Paper';

import { VictoryPie, VictoryTheme, VictoryContainer } from 'victory';

export class GenreChart extends React.Component {

    // pass down data as props
    constructor(props) {
        super(props);
    }

    render() {

        const data = this.props.genres.map((object, index) => {
            let filteredGenre = object.genre.slice(0, 1).toUpperCase() + object.genre.slice(1);
            return { x: index, y: object.count, label: filteredGenre}
        });

        return (
            <Paper style={{maxHeight: 650, display: "flex"}}>
                <VictoryPie 
                    data={data}
                    animate={{ duration: 200 }}
                    colorScale={this.props.colors}
                    padding={{ top: 70, bottom: 70, right: 70, left: 70}}
                    width={550}
                    height={500}
                    containerComponent={<VictoryContainer responsive={false}/>}
                    innerRadius={100}
                    padAngle={3}
                    style={{ labels: {
                        fontSize: 20
                    }}}
                >

                </VictoryPie>
            </Paper>
        )

    }

}

export default GenreChart;