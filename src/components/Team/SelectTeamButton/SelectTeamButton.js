import React from 'react';
import classes from './SelectTeamButton.css';
import {NavLink} from 'react-router-dom';

const SelectTeamButton = (props) => (
    
    <NavLink to={"/Team/" + props.teamId} >
    <div className={classes.SelectTeamButton} onClick={props.buttonClicked}>
        <div>{props.teamName}</div>
    </div>
    </NavLink>
)

export default SelectTeamButton;