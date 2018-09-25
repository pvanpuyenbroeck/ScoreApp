import React, { Component } from 'react';
import classes from './NavPanel.css';
import NavPanelLink from './NavPanelLink/NavPanelLink';
import NavIcon from '../../../assets/Images/NavIconBeige.png';
import SidePanel from '../SidePanel/SidePanel';
import SidePanelToggle from '../../UI/SidebarToggle/SidebarToggle';

class NavPanel extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    render() {
        let attachedClasses = ["menu-item", classes.NavPanel, classes.NavPanelColapsed]
        if (this.props.showToggle) {
            attachedClasses = ["menu-item", classes.NavPanel, classes.NavPanelOpen]
        }

        return (
            <div className={attachedClasses.join(' ')} >
            <SidePanelToggle toggleClicked={this.props.sidePanelToggle}/>
            <SidePanel/>
                {/* <div className={classes.NavIcon} onClick={this.showSettings}>
                    <img src={NavIcon} alt="NavIcon" />
                </div>
                <ul>
                    <NavPanelLink to="/">Home</NavPanelLink>
                    <NavPanelLink to="/selectTeam">Teams</NavPanelLink>
                    <NavPanelLink to="/AddTeam">Add Team</NavPanelLink>
                    <NavPanelLink to="/AddNewPlayer">Add New Player</NavPanelLink>
                </ul> */}
            </div>
        )
    }
}

export default NavPanel;