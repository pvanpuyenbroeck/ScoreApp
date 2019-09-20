import React from 'react';
import classes from './ButtonTeamMenu.css';

const ButtonTeamMenu = (props) => (
    <div className={classes.ButtonTeamMenu} style={{...props.style}}>
        <div onClick={props.buttonClicked}>
            {props.children}
        </div>
    </div>
)

export default ButtonTeamMenu;