import React, {useState} from 'react';
import classes from './PlayerAttendance.css';

const PlayerAttendance = props => {
    const playerRankingGrid = props.sortedPlayerArray.map((player, index) => {
        return (
            <React.Fragment key={index}>
                <div className={classes.PlaceColumn}>{index + 1}</div>
                <div className={classes.NameColumn}>{player.name}</div>
                <div className={classes.attendanceColum}>{player.goals}</div>
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

export default PlayerAttendance