import React, { useState, useEffect } from 'react';
import classes from './MatchPlayersOverview.css';
import PlayerButton from '../../Players/PlayerButton/PlayerButton';

const MatchPlayersOverview = (props) => {

    const [allPlayers, setAllPlayers] = useState("");
    const [alreadyInTeam, setAlreadyInTeam] = useState(false);

    useEffect(() => {
        let allParticipants = []
        for (let key in props.match.Participants) {
            allParticipants.push(props.match.Participants[key]);
        }
        const allParticipantsButtons = allParticipants.map(participant => {
            if (participant.active) {
                if(participant.userid === props.user.uid){
                    setAlreadyInTeam(true);
                }
                const name = participant.voornaam + " " + participant.familienaam;
                return (
                    <PlayerButton
                        name={name}
                        number={participant.playerNumber}
                    />
                )
            }
            return null;
        })
        setAllPlayers(allParticipantsButtons);
    }, [])

    return (
        <div className={classes.MatchPlayersContainer}>
            {allPlayers}
            {alreadyInTeam ? 
            <div 
            className={classes.Join} 
            onClick={props.removeClicked}
            style={{backgroundColor:'#F19722'}}
            >Niet meer deelnemen</div> :
            <div 
            className={classes.Join} 
            onClick={props.joinClicked}
            style={{backgroundColor:'#2C8693'}}            
            >Deelnemen</div>}
        </div>
    )
}

export default MatchPlayersOverview;