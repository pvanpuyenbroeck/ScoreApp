import React, { Component } from 'react';
import classes from './Header.css';
import { connect } from 'react-redux';
import NavPanelLink from '../Navigation/NavPanel/NavPanelLink/NavPanelLink';

class header extends Component {

    render() {
        return (
        <div>
            <div className={classes.Header}>
                <div className={classes.TeamName}>{this.props.team.teamName}</div>
                        <div className={classes.HeaderLinks}>
                                <NavPanelLink to="/">Home</NavPanelLink>
                                <NavPanelLink to="/selectTeam">Teams</NavPanelLink>
                                <NavPanelLink to="/AddTeam">Add Team</NavPanelLink>
                                <NavPanelLink to="/AddNewPlayer">Add New Player</NavPanelLink>
                        </div>
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