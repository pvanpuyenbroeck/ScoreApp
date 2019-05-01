import React, { Component } from 'react';
import classes from './Header.css';
import { connect } from 'react-redux';
import NavPanelLink from '../Navigation/NavPanel/NavPanelLink/NavPanelLink';
import * as actions from '../../store/actions/index';

class header extends Component {
    logout = () => {
        this.props.logout();
        // this.props.closeSidePanel();
        // window.location.reload();
    }
    render() {
        let NavLinks = null;
        if(this.props.isAuthenticated){
            NavLinks = (
                <div className={classes.HeaderLinks}>
                {/* <NavPanelLink to="/">Home</NavPanelLink>
                {/* <NavPanelLink> */}
                {/* <NavLink
                className={classes.NavLink}
                to="/selectTeam"
                activeClassName={classes.active}>
                Select Team
            </NavLink> 
                </NavPanelLink>
                <NavPanelLink NavClicked={() => this.props.navItemClicked("AddTeam")}>Add Team</NavPanelLink> */}
                {/* <NavPanelLink NavClicked={() => this.props.navItemClicked("AddPlayer")}>Add New Player</NavPanelLink> */}
                <NavPanelLink NavClicked={() => this.logout()}>Logout</NavPanelLink>
            </div>
            )
        }else{
            NavLinks = (
                <div className={classes.HeaderLinks}>
                <NavPanelLink to="/">Home</NavPanelLink>
            </div>
            )
        }
        return (
                <div className={classes.Header}>
                    <div className={classes.TeamName}>{this.props.team.teamName}</div>
                    {NavLinks}
                </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        team: state.team.selectedTeam,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // navItemClicked: (navItem) => dispatch({type: 'NavPanelSelection', navItem:navItem}),
        navItemClicked: (navItem) => dispatch(actions.navpanelSelection(navItem)),
        closeSidePanel: () => dispatch(actions.sidepanelToggle()),
        logout: () => dispatch(actions.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(header);