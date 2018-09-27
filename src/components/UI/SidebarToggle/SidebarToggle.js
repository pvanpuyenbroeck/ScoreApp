import React from 'react';
import classes from './SidebarToggle.css';

const sidebarToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.toggleClicked}>
        <p>MENU</p>
    </div>
)

export default sidebarToggle;