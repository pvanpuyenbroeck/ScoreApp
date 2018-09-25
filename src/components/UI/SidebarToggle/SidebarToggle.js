import React from 'react';
import classes from './SidebarToggle.css';

const sidebarToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.toggleClicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default sidebarToggle;