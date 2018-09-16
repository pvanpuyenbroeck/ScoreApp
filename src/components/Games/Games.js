import React from 'react';
import classes from './Games';
import Button from '../UI/Button/Button';
import Match from '../Games/Match/Match';

const games = (props) => {
    console.log(props);
    let gameArray = [];
    for(let key in props.matches){
        gameArray.push(props.matches[key]);
    }
    let allGames = <h1>Er zijn geen geplande matches</h1>
    if (props.matches) {
        allGames = gameArray.map((game) => {
            console.log(game.gameData);
            return (
                <Match opponent={game.gameData.opponent} key={game.gameData.opponent}/>
            )
        })
    }


    return (

        <div className={classes.Games}>
            <Button
                path={"/Team/" + props.teamId + "/addGame"}>
                Match Toevoegen
                </Button>
            <div>

            </div>
            {allGames}
        </div>
    )
}

export default games;