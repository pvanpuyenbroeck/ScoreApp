import React from 'react';
import classes from './Players.css';
import GetAllPlayers from './getAllPlayers';
import Spinner from '../../UI/Spinner/Spinner';
import PlayerButton from '../PlayerButton/PlayerButton';


const Players = (props) => {
    // let players = GetAllPlayers(props);
    let players = "";
    let allPlayers = [];
    console.log(props);
    if (props.playerDetails) {
        for (let key in props.playerDetails) {
            console.log(key);
            if (props.team.TeamMembers[key].active) {
                allPlayers.push({
                    playerId: key,
                    ...props.playerDetails[key]
                })
            }
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
                    removePlayerClicked={() => props.removePlayerClicked(player.userid)}
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