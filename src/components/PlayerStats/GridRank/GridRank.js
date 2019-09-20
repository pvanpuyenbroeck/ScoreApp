import React, {useState, useEffect} from 'react';
import classes from './GridRank.css';

const GridRank = props => {
    const playerRankingGrid = props.sortedPlayerArray.map((player, index) => {
        return (
            <React.Fragment key={index}>
                <div className={classes.PlaceColumn}>{index + 1}</div>
                <div className={classes.NameColumn}>{player.name}</div>
                {props.rankingType === 'Goals'? <div className={classes.AttendanceColumn}>{player.goals}</div>
                : <div className={classes.AttendanceColumn}>{player.attendance}</div>}
            </React.Fragment>
        )
    })
    const placeHeaderClass = [classes.PlaceColumn, classes.Header];
    const nameHeaderClass = [classes.NameColumn, classes.Header];
    const countHeaderClass = [classes.CountColumn, classes.Header];
    const RankingBoxClass = [classes.RankingBox, classes.SlideIn];

    useEffect(() => {
        // const rankingBox = document.getElementById("RankingBox");
        RankingBoxClass.push(classes.SlideIn);
    })

    return (
        <div className={classes.RankingContainer}>
            <div id="RankingBox" className={RankingBoxClass.join(' ')}>
                <div className={placeHeaderClass.join(" ")}>Ranking</div>
                <div className={nameHeaderClass.join(" ")}>Naam</div>
                <div className={countHeaderClass.join(" ")}>{props.rankingType}</div>
                {playerRankingGrid}
            </div>
        </div>
    )
}

export default GridRank;