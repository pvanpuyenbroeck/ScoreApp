import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavPanelLink.css';
const navPanelLink = (props) => (
    <li className={classes.NavPanelLink}>
    <NavLink 
    className={classes.NavLink}
    to={props.to}
    activeClassName={classes.active}
    >{props.children}</NavLink>       
    </li>
)
export default navPanelLink;