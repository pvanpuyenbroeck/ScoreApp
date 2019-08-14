import React, { useState, useEffect } from 'react';
import classes from './Players.css';
import Spinner from '../../UI/Spinner/Spinner';
import PlayerButton from '../PlayerButton/PlayerButton';


const Players = (props) => {
    // let players = GetAllPlayers(props);
    let [players, setPlayers] = useState(<Spinner />);
    let [allPlayers, setAllPlayers] = useState([]);

    useEffect(() => {
        if (props.team.filteredPlayers) {
            let allplayers = [];
            for (let key in props.team.filteredPlayers) {
                if (props.team.TeamMembers[key].active) {
                    allplayers.push({
                        playerId: key,
                        ...props.team.filteredPlayers[key]
                    })
                }
            }
            setAllPlayers(allplayers);
            const playersArray = Object.values(allplayers);
            const filteredPlayers = playersArray.map(player => {
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
            }
            );
            setPlayers(filteredPlayers);
        } else {
            setPlayers(<h1>Voeg spelers toe</h1>);
        }
    }, [])

    return (
        <div className={classes.Players}>
            <div className={classes.PlayersBlock}>
                {players}
            </div>
        </div>
    )
}


export default Players;