import React from 'react';
import classes from './AddPlayersToMatch.css';
import Spinner from '../../UI/Spinner/Spinner';
import PlayerButton from '../../Players/PlayerButton/PlayerButton';
import Button from '../../../components/UI/Button/Button/Button';

const addPlayersToMatch = props => {
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
                        playerId={player.userid}
                        name={player.voornaam + " " + player.familienaam}
                        number={player.playerNumber}
                        clicked={(playerId) => props.PlayerButtonClicked(playerId)}
                        attending={player.attending}
                    />
                )})
    } else {
        players = <h2>Voeg spelers toe</h2>
    }
    return(
        <div className={classes.AddPlayersToMatch}>
        {players}
        <Button btnType="RedButton" clicked={props.addPlayers}>Voeg geselecteerde spelers toe</Button>
        </div>
    )
}

export default addPlayersToMatch;