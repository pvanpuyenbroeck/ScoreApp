import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavPanelLink.css';
const navPanelLink = (props) => (
    <div className={classes.NavPanelLink} onClick={props.NavClicked}>
        <NavLink
            className={classes.NavLink}
            to={props.to}
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </div>
)
export default navPanelLink;