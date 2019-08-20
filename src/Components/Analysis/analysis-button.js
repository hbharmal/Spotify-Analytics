import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';

import { changeAnalysisMode } from '../../Actions/analysisAction';

const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class AnalysisButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (_, value) => {
        this.props.changeMode(value);
    }
    
    render() {

        const  { classes } = this.props

        return (
                <AppBar position="static" color="default" style={{position:'sticky', top: 64}}>
                    <div >
                        <Tabs
                            value={this.props.mode}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            onChange={this.handleChange}
                        >
                            <Tab label="Genres" value={0} />
                            <Tab label="Features" value={1} />
                        </Tabs>
                    </div>
                </AppBar>
        )
    }
}

const mapStateToProps = state => {
    return {
        mode: state.analysis.mode 
    }
}

const mapDispatchToProps = dispatch => ({
    changeMode: (mode) => dispatch(changeAnalysisMode(mode))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AnalysisButton))