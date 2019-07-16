import React from 'react';
import classes from './Games.css';
import Match from '../Games/Match/Match';
import { Link } from 'react-router-dom';
import {sortOnDate} from '../../store/utility';

const games = (props) => {
    let gameArray = [];
    for (let key in props.matches) {
        gameArray.push({
            ...props.matches[key],
            matchId: key,
        });
    }

    const sortedMatchArray = sortOnDate(gameArray);
    
    let allGames = <h1>Er zijn geen geplande matches</h1>
    if (props.matches) {
        allGames = sortedMatchArray.map((game) => {
            return (
                <div className={classes.Match}
                    key={game.matchId}>

                    <Match
                        match={game}
                        matchButtonClicked={(match) => props.matchClicked(match)}
                        team={props.team}
                        showMatchDetailsClicked={(matchId) => props.showMatchDetailsClicked(game.matchId)}
                        history={props.history}
                        admin={props.admin}
                    />

                </div>
            )
        })
    }
    return (
        <div className={classes.GamesContainer}>
            <div className={classes.Matches}>
                {allGames}
            </div>
        </div>
    )
}

export default games;