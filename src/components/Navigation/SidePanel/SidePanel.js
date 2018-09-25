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
                <NavPanelLink to="/" NavClicked={props.sidePanelToggle}>Home</NavPanelLink>
                <NavPanelLink to="/selectTeam" NavClicked={props.sidePanelToggle}>Teams</NavPanelLink>
                <NavPanelLink to="/AddTeam" NavClicked={props.sidePanelToggle}>Add Team</NavPanelLink>
                <NavPanelLink to="/AddNewPlayer" NavClicked={props.sidePanelToggle}>Add New Player</NavPanelLink>
        </div>
    )
}

export default sidePanel;