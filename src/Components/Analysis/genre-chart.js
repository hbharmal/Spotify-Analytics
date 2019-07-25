import React from 'react';

import Paper from '@material-ui/core/Paper';

import { VictoryPie, VictoryTheme } from 'victory';

export class GenreChart extends React.Component {

    // pass down data as props
    constructor(props) {
        super(props);
        this.state = {
            colors: []
        }
    }

    componentWillMount() {
        const blue = "#4FC2D7";
        const green = "#54C88F";
        const lightBrown = "#D5AD79";
        const pink = "#E49CDA";
        const lightGreen = "#7CC29C";
        const white = "#9CBAA8";
        this.setState({
            colors: [blue, green, lightBrown, pink, lightGreen, white]
        });
    }

    render() {

        const data = this.props.genres.map((object, index) => {
            return { x: index, y: object.count, label: object.genre}
        });

        return (

            <Paper>
                <VictoryPie 
                    data={data}
                    animate={{ duration: 200 }}
                    colorScale={"greyscale"}
                    colorScale={this.state.colors}
                    padding={{ top: 70, bottom: 70, right: 70, left: 70}}
                    theme={VictoryTheme.material}
                >

                </VictoryPie>
            </Paper>
        )

    }

}

export default GenreChart;