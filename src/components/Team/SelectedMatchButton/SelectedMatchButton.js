import React from 'react';
import classes from './SelectTeamButton.css';
import {NavLink} from 'react-router-dom';

const SelectMatchButton = (props) => (
    
    <NavLink to={"/Team/" + props.id + "/matchCenter/" + props.matchId} >
    <div className={classes.SelectTeamButton} onClick={props.buttonClicked}>
        <div>{props.teamName}</div>
    </div>
    </NavLink>
)

export default SelectMatchButton;