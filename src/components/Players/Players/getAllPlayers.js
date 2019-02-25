import Spinner from '../../UI/Spinner/Spinner';
import PlayerButton from '../PlayerButton/PlayerButton';
import React from 'react';

const getAllPlayers = (props) => {
    let players = "";
    let allPlayers = [];
    console.log(props);
    if (props.playerDetails) {
        for (let key in props.playerDetails) {
            console.log(key);
            allPlayers.push({
                playerId: key,
                ...props.playerDetails[key]
            })
        }
        const playersArray = Object.values(allPlayers)
        players = <Spinner />;
        players = playersArray.map(player => {
            console.log(player);
            return (
                <PlayerButton
                    key={player.userid}
                    name={player.voornaam + " " + player.familienaam}
                    number={player.playerNumber}
                    user={props.user}
                    removePlayerClicked={props.removePlayerClicked(player.userid)}
                />
            )
        })
    } else {
        players = <h2>Voeg spelers toe</h2>
    }

    return players;
}

export default getAllPlayers;