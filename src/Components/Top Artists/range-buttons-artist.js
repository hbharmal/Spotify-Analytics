import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import  { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';

import { changeTimeRangeArtists } from '../../Actions/artistsAction';

const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class RangeButton extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange = (_, value) => {
        this.props.changeRange(value);
    }

    render() {

        const  { classes } = this.props

        return (
                <AppBar position="static" color="default" style={{position:'sticky', top: 64}}>
                    <div >
                        <Tabs
                            value={this.props.timeRange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            onChange={this.handleChange}
                        >
                            <Tab label="Four Weeks" value={0} />
                            <Tab label="6 Months" value={1} />
                            <Tab label="Lifetime" value={2} />
                        </Tabs>
                    </div>
                </AppBar>
        )
    }
}

const mapStateToProps = state => {
    return {
        timeRange: state.artists.timeRange
    }
}

const mapDispatchToProps = dispatch => ({
    changeRange: (range) => dispatch(changeTimeRangeArtists(range))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RangeButton))