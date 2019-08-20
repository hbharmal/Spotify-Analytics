import React from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';

import { VictoryPie, VictoryContainer } from 'victory';

import { setHoveredIndex } from '../../../Actions/analysisAction';

export class GenreChart extends React.Component {

    // pass down data as props
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        // this.state = {
        //     externalMutations: null
        // };
    }

    handleMouseEnter(index) {
        this.props.setHoverIndex(index);
    }

    handleMouseLeave() {
        this.props.setHoverIndex(null);
    }

    // componentDidUpdate(prevProps, prevState) {
    //     // if the last hovered index was null (doesn't constantly make changes when not necessary)
    //     if (this.props.hoveredIndex != null && this.state.externalMutations == null) {
    //         console.log("ok")
    //         this.setState({
    //             externalMutations: [
    //                 {   
    //                     childName: "main-chart",
    //                     target: "data",
    //                     eventKey: "all",
    //                     mutation: (props) => { 
    //                         return {
    //                             style: Object.assign({}, props.style, { stroke: "#C43a31", strokeWidth: 3 } )
    //                         }
    //                     },
    //                 }
    //             ]
    //         });
    //     }
        // } else if (this.props.hoveredIndex == null && this.state.externalMutations != null) {
        //     console.log("bye")
        //     this.setState({
        //         externalMutations: null
        //     });
        // }
    // }

    render() {

        let externalMutations = null;;

        if (this.props.hoveredIndex != null) {
            externalMutations = [
                {   
                    childName: "main-chart",
                    target: "data",
                    eventKey: "all",
                    mutation: (props) => { 
                        return {
                            style: Object.assign({}, props.style, { stroke: "#C43a31", strokeWidth: 3 } )
                        }
                    },
                }
            ]
        }

        const data = this.props.genres.map((object, index) => {
            let filteredGenre = object.genre.slice(0, 1).toUpperCase() + object.genre.slice(1);
            return { x: index, y: object.count, label: filteredGenre}
        });

        return (
            <Paper style={{maxHeight: 650, display: "flex"}}>
                <VictoryPie 
                    name="main-chart"
                    data={data}
                    animate={{ duration: 200 }}
                    colorScale={this.props.colors}
                    padding={{ top: 70, bottom: 70, right: 70, left: 70}}
                    width={550}
                    height={500}
                    origin={{x: 550 / 2, y: 250}}
                    containerComponent={<VictoryContainer responsive={false}/>}
                    innerRadius={100}
                    padAngle={3}
                    style={{ 
                        labels: {
                            fontSize: 20
                        },
                    }}
                    // externalEventMutations={externalMutations}
                    events={[{
                        childName: "all",
                        target: "data",
                        eventHandlers: {
                            onMouseOver: () => ({
                                // mutation: (props) => ({
                                //     style: Object.assign({}, props.style, { stroke: "#C43a31", strokeWidth: 3 }) 
                                // })
                                mutation: (props) => {
                                    this.handleMouseEnter(props.index);
                                    return {
                                        style: Object.assign({}, props.style, { stroke: "#C43a31", strokeWidth: 3 } )
                                    }
                                }
                            }),
                            onMouseOut: () => ({
                                mutation: (props) => {
                                    this.handleMouseLeave();
                                    return null;
                                }
                            }), 
                            onClick: (props) => {
                                
                            }
                        }
                    }]}
                    style={{height: '100%', width: '100%'}}
                >
                </VictoryPie>
            </Paper>
        )

    }

}

const mapStateToProps = state => {
    return {
        hoveredIndex: state.analysis.hoveredIndex
    };
;}

const mapDispatchToProps = dispatch => ({
    setHoverIndex: (index) => dispatch(setHoveredIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(GenreChart);

