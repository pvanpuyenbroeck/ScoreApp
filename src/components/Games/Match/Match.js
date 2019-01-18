import React from 'react';
import classes from './Match.css';
import { Link } from 'react-router-dom';

const Match = (props) => {
    let homeGoals = 0;
    for(let key in props.match.Participants){
        homeGoals += props.match.Participants[key].goals;
    }
    return (
        <Link to={"/Team/" + props.team.teamId + "/Match/" + props.match.matchId} style={{ textDecoration: 'none' }}>
            <div className={classes.Match} onClick={() => props.matchButtonClicked(props.match)}>
                {/* <div>Afbeelding komt hier</div> */}
                <div>
                    <div>{props.team.teamName}</div>
                    <div className={classes.OpponentName}>{props.team.teamName} - {typeof props.match.gameData.opponent === 'undefined' ? null : props.match.gameData.opponent}</div>
                    <div className={classes.Score}>{homeGoals} - {props.match.oponentGoals}</div>
                </div>
            </div>
        </Link>
    )
}

export default Match;