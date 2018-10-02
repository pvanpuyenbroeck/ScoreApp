import React from 'react';
import classes from './Games';
import Button from '../UI/Button/Button';
import Match from '../Games/Match/Match';

const games = (props) => {
    console.log(props);
    let gameArray = [];
    for(let key in props.matches){
        gameArray.push({
            ...props.matches[key],
            matchId:[key],
        });
    }
    console.log(gameArray);
    let allGames = <h1>Er zijn geen geplande matches</h1>
    if (props.matches) {
        allGames = gameArray.map((game) => {
            console.log(game);
            return (
                <Match key={game.gameData.opponent} match={game} location={props.location}/>
            )
        })
    }
    return (
        <div className={classes.Games}>
        {allGames}            
        </div>
    )
}

export default games;