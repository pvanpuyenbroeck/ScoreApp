import React from 'react';
import classes from './NavPanel.css';

import NavPanelLink from './NavPanelLink/NavPanelLink';


const NavPanel = (props) => (
    <ul className={classes.NavPanel}>
            <NavPanelLink to="/">Home</NavPanelLink>
            <NavPanelLink to="/selectTeam">Teams</NavPanelLink>
            <NavPanelLink to="/AddTeam">Add Team</NavPanelLink>
            <NavPanelLink to="/AddNewPlayer">Add New Player</NavPanelLink>
    </ul>
)

export default NavPanel;