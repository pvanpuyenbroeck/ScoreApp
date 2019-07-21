import React from 'react';
import classes from './PlayerRanking.css';

const PlayerRanking = (props) => {

    let players = []
    for (let playerkeys in props.team.TeamMembers) {
        players.push({
            name: null,
            goals: 0,
            key: playerkeys,
        })
    }
    players.map(player => {
        player.name = player.name === null ? props.team.filteredPlayers[player.key].voornaam + " " + props.team.filteredPlayers[player.key].familienaam : player.name;
        for (let matchKey in props.team.Matches) {
            if (typeof props.team.Matches[matchKey].Participants !== 'undefined') {
                if (typeof props.team.Matches[matchKey].Participants[player.key] !== 'undefined') {
                    const participant = props.team.Matches[matchKey].Participants[player.key];
                    player.goals = participant.goals + player.goals;
                }
            }
        }
        return null;
    })

    const sortedPlayerArray = players.sort((a,b) => {
        if(a.goals > b.goals){
            return -1;
        }
        if(a.goals < b.goals){
            return 1
        }
        return 0;
    })
    const playerRankingGrid = sortedPlayerArray.map((player, index) => {
        return (
            <React.Fragment key={index}>
                <div className={classes.PlaceColumn}>{index + 1}</div>
                <div className={classes.NameColumn}>{player.name}</div>
                <div className={classes.GoalsColumn}>{player.goals}</div>
            </React.Fragment>
        )
    })
    const placeHeaderClass = [classes.PlaceColumn, classes.Header];
    const nameHeaderClass = [classes.NameColumn, classes.Header];
    const goalsHeaderClass = [classes.GoalsColumn, classes.Header];

    return (
        <div className={classes.RankingContainer}>
            <div className={classes.RankingBox}>
                <div className={placeHeaderClass.join(" ")}>Ranking</div>
                <div className={nameHeaderClass.join(" ")}>Naam</div>
                <div className={goalsHeaderClass.join(" ")}>Goals</div>
                {playerRankingGrid}
            </div>
        </div>
    )
}

export default PlayerRanking;