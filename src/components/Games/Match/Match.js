import React, { useState } from 'react';
import classes from './Match.css';
import { Link } from 'react-router-dom';
import { StyledLink } from './MatchStyle';
import styled from 'styled-components';
import { colors } from '../../../utils/styles/helpers';
import CloseButton from '../../../assets/Images/delete-30.png';


const Match = (props) => {
    const [showOptions, setShowOptions] = useState(classes.HideOptions);

    let homeGoals = 0;
    for (let key in props.match.Participants) {
        homeGoals += props.match.Participants[key].goals;
    }
    const dateFormat = () => {
        let date = new Date(props.match.gameData.date);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const months = ['Januari', 'Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'];
        return (
            <React.Fragment>
                <div>{day}</div>
                <div>{months[month]}</div>
                <div>{hour}:{minutes}</div>
                <div>{year}</div>
            </React.Fragment>
        )
        // `${day}-${month}-${year}  ${hour}:${minutes}`
    }

    const setShowHideOptionsHandler = (showClass) => {
        setShowOptions(showClass);
    }

    const closeButtonStyle = {
        backgroundImage: `url(${CloseButton})`,
        // visibility: `${this.state.closeButton}`
    }

    // const showHideOptionsClasses = [classes.Match,showOptions]

    return (
        <React.Fragment>
            <div className={showOptions}
                    onMouseEnter={() => setShowHideOptionsHandler(classes.ShowOptions)}
                    onMouseLeave={() => setShowHideOptionsHandler(classes.HideOptions)} >
                <div
                    style={closeButtonStyle} 
                    className={classes.CloseButton}
                    onClick={(teamId) => props.removeMatchClicked(teamId)}
                ></div>
            </div>
            <Link to={"/Team/" + props.team.teamId + "/Match/" + props.match.matchId} style={{ textDecoration: 'none' }}>
                <div
                    className={classes.Match}
                    onClick={() => props.matchButtonClicked(props.match)}
                    onMouseEnter={() => setShowHideOptionsHandler(classes.ShowOptions)}
                    onMouseLeave={() => setShowHideOptionsHandler(classes.HideOptions)}
                >
                    {/* <div>Afbeelding komt hier</div> */}
                    <div className={classes.GameDate}>{dateFormat()}</div>
                        <div className={classes.TeamName}><h1>{props.team.teamName}</h1></div>
                        <div className={classes.OpponentName}>
                            <div>{typeof props.match.gameData.opponent === 'undefined' ? null : props.match.gameData.opponent}</div>
                        </div>
                        <div className={classes.Score}>{homeGoals} - {props.match.oponentGoals}</div>
                </div>
            </Link>
        </React.Fragment>
    )
}

export default Match