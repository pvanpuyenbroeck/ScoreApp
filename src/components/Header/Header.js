import React, { Component } from 'react';
import classes from './Header.css';
import { connect } from 'react-redux';
import NavPanelLink from '../Navigation/NavPanel/NavPanelLink/NavPanelLink';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/index';

class header extends Component {

    render() {
        return (
            <div>
                <div className={classes.Header}>
                    <div className={classes.TeamName}>{this.props.team.teamName}</div>
                    <div className={classes.HeaderLinks}>
                        <NavPanelLink to="/">Home</NavPanelLink>
                        <NavPanelLink>
                        <NavLink
                        className={classes.NavLink}
                        to="/selectTeam"
                        activeClassName={classes.active}>
                        Select Team
                    </NavLink>
                        </NavPanelLink>
                        <NavPanelLink NavClicked={() => this.props.navItemClicked("AddTeam")}>Add Team</NavPanelLink>
                        <NavPanelLink NavClicked={() => this.props.navItemClicked("AddPlayer")}>Add New Player</NavPanelLink>
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

const mapDispatchToProps = dispatch => {
    return {
        // navItemClicked: (navItem) => dispatch({type: 'NavPanelSelection', navItem:navItem}),
        navItemClicked: (navItem) => dispatch(actions.navpanelSelection(navItem)),
        closeSidePanel: () => dispatch(actions.sidepanelToggle()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(header);