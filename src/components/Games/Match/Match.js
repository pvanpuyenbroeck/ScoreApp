import React from 'react';
import classes from './Match.css';
import {Link } from 'react-router-dom';

const Match = (props) => (
    <Link to={"/Team/" + props.match.gameData.teamId + "/Match/" + props.match.matchId} style={{ textDecoration: 'none' }}>
        <div className={classes.Match} onClick={() => props.matchButtonClicked(props.match)}>
            {/* <div>Afbeelding komt hier</div> */}
            <div>
                <div>{props.match.gameData.teamName}</div>

                <div className={classes.OpponentName}>{props.match.gameData.opponent}</div>
            </div>
        </div>
    </Link>
)

export default Match;