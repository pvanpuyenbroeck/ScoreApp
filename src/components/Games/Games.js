import React from 'react';
import classes from './Games.css';
import Match from '../Games/Match/Match';

const games = (props) => {
    let gameArray = [];
    for(let key in props.matches){
        gameArray.push({
            ...props.matches[key],
            matchId:key,
        });
    }
    let allGames = <h1>Er zijn geen geplande matches</h1>
    if (props.matches) {
        allGames = gameArray.map((game) => {
            return (
                <Match 
                key={game.matchId} 
                match={game} 
                matchButtonClicked={(match) => props.matchClicked(match)} 
                team={props.team}
                />
            )
        })
    }
    return (
        <div className={classes.Games}>
        <h1>Matches</h1>
        {allGames}            
        </div>
    )
}

export default games;