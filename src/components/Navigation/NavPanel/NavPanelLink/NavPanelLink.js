import React from 'react';
import classes from './NavPanelLink.css';
const navPanelLink = (props) => (
    <div className={classes.NavPanelLink} onClick={props.NavClicked}>
        {props.children}
    </div>
)
export default navPanelLink;