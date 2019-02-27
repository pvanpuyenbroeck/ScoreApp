import React from 'react';
import classes from './AddPlayersToMatch.css';
import Spinner from '../../UI/Spinner/Spinner';
import PlayerButton from '../../Players/PlayerButton/PlayerButton';
import Button from '../../../components/UI/Button/Button/Button';

const addPlayersToMatch = props => {
    let players = "";
    let allPlayers = [];
    let classessArray = [classes.AddPlayersToMatch]
    if (!props.visible) {
        classessArray.push(classes.Hide);
    }
    if (props.playerDetails) {
        for (let key in props.playerDetails) {
            allPlayers.push({
                playerId: key,
                key: key,
                ...props.playerDetails[key]
            })
        }
        const playersArray = Object.values(allPlayers)
        players = <Spinner />;
        players = playersArray.map(player => {
            if(player.active){
            return (
                <PlayerButton
                    key={player.userid}
                    playerid={player.userid}
                    name={player.voornaam + " " + player.familienaam}
                    number={player.playerNumber}
                    clicked={() => props.PlayerButtonClicked(player.userid)}
                    attending={player.attending}
                    playerSelect={true}
                />
            )}else{
                return null;
            }
        })
    } else {
        players = <h2>Voeg spelers toe</h2>
    }
    return (
        <div className={classessArray.join(' ')}>
            <div className={classes.Header}>Stel uw team samen</div>
            <div className={classes.PlayerButtons}>
                {players}
            </div>
            <Button btnType="RedButton" clicked={props.addPlayers}>Terug</Button>
        </div>
    )
}

export default addPlayersToMatch;