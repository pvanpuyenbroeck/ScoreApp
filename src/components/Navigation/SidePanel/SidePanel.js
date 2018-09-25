import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import NavPanelLink from '../NavPanel/NavPanelLink/NavPanelLink';
import classes from './SidePanel.css';

const sidePanel = (props) => {
    let attachedClasses = [classes.SidePanel]
    if(props.showToggle){
        attachedClasses.push(classes.SidePanelOpen)
    }
    return (
        // Pass on our props
        <div className={attachedClasses.join(' ')}>
                <NavPanelLink to="/">Home</NavPanelLink>
                <NavPanelLink to="/selectTeam">Teams</NavPanelLink>
                <NavPanelLink to="/AddTeam">Add Team</NavPanelLink>
                <NavPanelLink to="/AddNewPlayer">Add New Player</NavPanelLink>
        </div>
    )
}

export default sidePanel;