import React from 'react';
import classes from './Match.css';
import {NavLink} from 'react-router-dom';

const Match = (props) => (
    <div className={classes.Match} onClick={props.matchButtonClicked}>
    <NavLink to={"/Team/" + props.id + "/matchCenter/" + props.matchId}>
        <div>Afbeelding komt hier</div>
        <div>    
            <div>{props.teamName}</div>   
            {props.opponent}
        </div>
        </NavLink>
    </div>
)

export default Match;