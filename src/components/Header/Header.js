import React, { Component } from 'react';
import classes from './Header.css';
import { connect } from 'react-redux';

class header extends Component {

    render() {
        return (
            <div>
                <div className={classes.Header}>
                <div className={classes.TeamName}>{this.props.team.teamName}</div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        team: state.team
    }
}

export default connect(mapStateToProps)(header);