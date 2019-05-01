import React, { Component } from 'react';
import NavPanelLink from '../NavPanel/NavPanelLink/NavPanelLink';
import classes from './SidePanel.css';
import Flexbox from '../../UI/Flexbox/Flexbox';
import AddPlayer from '../../../containers/TeamControl/AddPlayer/AddPlayer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

class sidePanel extends Component {

    logout = () => {
        this.props.logout();
        this.props.closeSidePanel();
        // window.location.reload();
    }
    render() {
        let attachedClasses = [classes.SidePanel]
        if (this.props.showToggle) {
            attachedClasses.push(classes.SidePanelOpen)
        }
        const flexComponent = <AddPlayer />;

        let navPanels = (
            <div className={attachedClasses.join(' ')}>
                <NavPanelLink>
                    <NavLink
                        to="/auth"
                        onClick={() => this.props.closeSidePanel()}>
                        Login
            </NavLink>
                </NavPanelLink>
            </div>
        )

        if (this.props.isAuthenticated) {
            navPanels = (
                <div className={attachedClasses.join(' ')}>
                    {/* <NavPanelLink>
                        <NavLink
                            onClick={() => this.props.closeSidePanel()}
                            className={classes.NavLink}
                            to="/selectTeam"
                            activeClassName={classes.active}>
                            Select Team
            </NavLink>
                    </NavPanelLink> */}
                    {/* <NavPanelLink NavClicked={() => this.props.navItemClicked("AddTeam")}>Add Team</NavPanelLink> */}
                    {/* <NavPanelLink NavClicked={() => this.props.navItemClicked("AddPlayer")}>Add New Player</NavPanelLink> */}
                    <NavPanelLink NavClicked={() => this.logout()}>Logout</NavPanelLink>
                    <NavPanelLink NavClicked={() => this.props.navItemClicked("Profile")}>My Profile</NavPanelLink>                    
                </div>
            )
        }
        return (
            // Pass on our props
            <div>
                {navPanels}
                <Flexbox show={this.props.showFlexbox}>
                    <div>
                        {flexComponent}
                    </div>
                </Flexbox>

            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        navItemClicked: (navItem) => dispatch(actions.navpanelSelection(navItem)),
        closeSidePanel: () => dispatch(actions.closeModal()),
        logout: () => dispatch(actions.logout()),
    }
};

const mapStateToProps = state => {
    return {
        navItem: state.NavPanelLink,
        toggleSidePanel: state.ToggleSidePanel,
        isAuthenticated: state.auth.user !== null,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(sidePanel);