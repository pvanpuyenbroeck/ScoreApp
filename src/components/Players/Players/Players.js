import React from 'react';
import PlayerButton from '../PlayerButton/PlayerButton';
import classes from './Players.css';
import firebase from '../../../firebase-scoreapp';
import Spinner from '../../UI/Spinner/Spinner';

const Players = (props) => {
    let players = "";
    let allPlayers = [];
    console.log(props);
    if (props.playerDetails) {
        for(let key in props.playerDetails){
            console.log(key);
            allPlayers.push({
                playerId: key,
                ...props.playerDetails[key]
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