import Spinner from '../../UI/Spinner/Spinner';
import PlayerButton from '../PlayerButton/';
import React from 'react';

getAllPlayers(team) {
    let players = "";
    let allPlayers = [];
    console.log(team);
    if (team.playerDetails) {
        for(let key in team.playerDetails){
            console.log(key);
            allPlayers.push({
                playerId: key,
                ...team.playerDetails[key]
            })
        }
        const playersArray = Object.values(allPlayers)
        players = <Spinner/>;
     players = playersArray.map(player => {
                console.log(player);
                return (
                    <PlayerButton
                        key={player.userId}
                        name={player.voornaam + " " + player.familienaam}
                        number={player.playerNumber}
                    />
                )})
    } else {
        players = <h2>Voeg spelers toe</h2>
    }
} 

export default getAllPlayers;