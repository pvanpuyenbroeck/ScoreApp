import React from 'react';
import classes from './Players.css';
import GetAllPlayers from './getAllPlayers';

const Players = (props) => {
    let players = GetAllPlayers(props);
    return (
        <div className={classes.Players}>
            <h1>Spelers</h1>
            <div className={classes.PlayersBlock}>
                {players}
            </div>
        </div>
    )
}


export default Players;