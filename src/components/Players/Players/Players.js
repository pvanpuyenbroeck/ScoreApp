import React from 'react';
import classes from './Players.css';
import Spinner from '../../UI/Spinner/Spinner';
import PlayerButton from '../PlayerButton/PlayerButton';


const Players = (props) => {
    // let players = GetAllPlayers(props);
    let players = "";
    let allPlayers = [];
    if (props.playerDetails) {
        for (let key in props.playerDetails) {
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
            return (
                <PlayerButton
                    key={player.userid}
                    name={player.voornaam + " " + player.familienaam}
                    number={player.playerNumber}
                    user={props.user}
                    // removePlayerClicked={() => props.removePlayerClicked(player.userid)}
                    clicked={() => props.playerClicked(player.userid)}
                    admin={props.admin}
                />
            )
        })
    } else {
        players = <h1>Voeg spelers toe</h1>
    }
    return (
        <div className={classes.Players}>
            <div className={classes.PlayersBlock}>
                {players}
            </div>
        </div>
    )
}


export default Players;