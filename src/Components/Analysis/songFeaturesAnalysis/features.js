import React from 'react';

import Grid from '@material-ui/core/Grid';

import RadarChart from './radar-chart';
import Selections from './selections';
import Statistics from './statistics';

export class Features extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{flexGrow: 1}}>
                <Grid container direction="column" justify="center" alignItems="stretch">
                    <Grid item xs={8} style={{padding: '10px 5px 10px 10px'}}>
                        <Grid container direction="row" >
                            <Grid item xs={8} >
                                <RadarChart />
                            </Grid>
                            <Grid item xs={4}>
                                <Selections />
                            </Grid> 
                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{padding: '10px 5px 10px 10px'}}>
                        <Statistics />
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default Features; 