import React, { useState, useEffect } from 'react';
import classes from './MatchPlayersOverview.css';
import PlayerButton from '../../Players/PlayerButton/PlayerButton';

const MatchPlayersOverview = (props) => {

    const [allPlayers, setAllPlayers] = useState("");

    useEffect(() => {
        let allParticipants = []
        for (let key in props.match.Participants) {
            allParticipants.push(props.match.Participants[key]);
        }
        const allParticipantsButtons = allParticipants.map(participant => {
            if (participant.active) {
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
            <div className={classes.Join} onClick={props.joinClicked}>Deelnemen</div>
        </div>
    )
}

export default MatchPlayersOverview;