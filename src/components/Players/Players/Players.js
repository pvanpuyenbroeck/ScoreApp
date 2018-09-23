import React from 'react';
import PlayerButton from '../PlayerButton/PlayerButton';
import classes from './Players.css';
import firebase from '../../../firebase-scoreapp';

const Players = (props) => {
    let players = "";
    console.log(props.playerDetails);
    const playersArray = Object.values(props.playerDetails);
    console.log(playersArray);
    if (playersArray.length > 0) {
        players =
            playersArray.map(player => {
                return (
                    <PlayerButton
                        key={player.id}
                        name={player.name}
                        number={player.playerNumber}
                    />
                )})
    } else {
        players = <h2>Voeg spelers toe</h2>
    }

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