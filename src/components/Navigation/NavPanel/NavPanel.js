import React from 'react';
import classes from './NavPanel.css';
import NavPanelLink from './NavPanelLink/NavPanelLink';
import NavIcon from '../../../assets/Images/NavIconBeige.png';


const NavPanel = (props) => {
    let attachedClasses = [classes.NavPanel, classes.NavPanelColapsed]
    if(props.showToggle){
        attachedClasses = [classes.NavPanel, classes.NavPanelOpen]
    }
    return (
        <div className={attachedClasses.join(' ')}>
            <div className={classes.NavIcon} onClick={props.clicked}>
                <img src={NavIcon} alt="NavIcon" />
            </div>
            <ul>
                <NavPanelLink to="/">Home</NavPanelLink>
                <NavPanelLink to="/selectTeam">Teams</NavPanelLink>
                <NavPanelLink to="/AddTeam">Add Team</NavPanelLink>
                <NavPanelLink to="/AddNewPlayer">Add New Player</NavPanelLink>
            </ul>
        </div>
    )
}

export default NavPanel;