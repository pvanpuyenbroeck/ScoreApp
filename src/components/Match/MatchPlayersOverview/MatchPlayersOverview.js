import React, { useState, useEffect } from 'react';
import classes from './MatchPlayersOverview.css';
import PlayerButton from '../../Players/PlayerButton/PlayerButton';

const MatchPlayersOverview = (props) => {

    const [allPlayers, setAllPlayers] = useState("");
    const [alreadyInTeam, setAlreadyInTeam] = useState(false);
    const [currenPlayerIsTeammember, setCurrentPlayerIsTeammember] = useState({ display: 'none' });

    useEffect(() => {
        let allParticipants = []
        for (let key in props.match.Participants) {
            allParticipants.push(props.match.Participants[key]);
        }
        const allParticipantsButtons = allParticipants.map(participant => {
            if (participant.active) {
                if (participant.userid === props.user.uid) {
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

    useEffect(() => {
        setCurrentPlayerIsTeammember(() => {
            if (typeof props.allTeamMember !== 'undefined') {
                const allTeammemberId = Object.keys(props.allTeamMember);
                if (allTeammemberId.includes(props.user.uid)) {
                    return { display: 'initial' };
                }
                else {
                    return { display: 'none' };
                }
            }
            else {
                return { display: 'none' };
            }
        })
    }, [])

    return (
        <div className={classes.MatchPlayersContainer}>
            {allPlayers}
            <div style={currenPlayerIsTeammember}>
                {alreadyInTeam ?
                    <div
                        className={classes.Join}
                        onClick={props.removeClicked}
                        style={{ backgroundColor: '#F19722' }}
                    >Niet meer deelnemen</div> :
                    <div
                        className={classes.Join}
                        onClick={props.joinClicked}
                        style={{ backgroundColor: '#2C8693' }}
                    >Deelnemen</div>}
            </div>
        </div>
    )
}

export default MatchPlayersOverview;