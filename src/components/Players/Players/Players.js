import React from 'react';
import PlayerButton from '../PlayerButton/PlayerButton';
import classes from './Players.css';

const Players = (props) => {
    let players = "";
    console.log(props.team.players);
    if (props.team.players.length > 0) {
        players =
            props.team.players.map(player => {
                console.log(player)
                return (
                    <PlayerButton
                        key={player.id}
                        name={player.playerData.name}
                        number={player.playerData.playerNumber}
                    />
                )
            })
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