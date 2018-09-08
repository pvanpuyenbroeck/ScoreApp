import React, { Component } from 'react';
import PlayerButton from '../../../../components/Players/PlayerButton/PlayerButton';

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
                    />
                )
            })
    } else {
        players = <h2>Voeg spelers toe</h2>
    }

    return (
        <div>
            <h1>Spelers</h1>
            {players}
        </div>
    )
}


export default Players;