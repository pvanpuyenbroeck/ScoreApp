import React from 'react';
import classes from './Match.css';
import {Link } from 'react-router-dom';

const Match = (props) => (
    <Link to={"/Team/" + props.match.gameData.teamId + "/Match/" + props.match.matchId}>
        <div className={classes.Match} onClick={() => props.matchButtonClicked(props.match)}>
            <div>Afbeelding komt hier</div>
            <div>
                <div>{props.match.gameData.teamName}</div>
                {props.match.gameData.opponent}
            </div>
        </div>
    </Link>
)

export default Match;