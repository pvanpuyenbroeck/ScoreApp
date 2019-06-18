import React, { useState } from 'react';
import classes from './Match.css';
import CloseButton from '../../../assets/Images/delete-30.png';
import MoreButton from '../../../assets/Images/MoreButton.png';


const Match = (props) => {
    const [showOptions, setShowOptions] = useState(false);

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
        const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
        return (
            <React.Fragment>
                <div>{day}</div>
                <div>{months[month]}</div>
                <div>{hour}{minutes === 0 ? "u" : "u" + minutes}</div>
                <div className={classes.Year}>{year}</div>
            </React.Fragment>
        )
        // `${day}-${month}-${year}  ${hour}:${minutes}`
    }

    const goToMatchPageHandler = () => {
        props.matchButtonClicked(props.match)
        props.history.replace("/Team/" + props.team.teamId + "/Match/" + props.match.matchId);
    }

    const setShowHideOptionsHandler = () => {
        setShowOptions(!showOptions);
    }

    const closeButtonStyle = {
        backgroundImage: `url(${CloseButton})`,
        // visibility: `${this.state.closeButton}`
    }

    const moreButtonStyle = {
        backgroundImage: `url(${MoreButton})`,
    }

    // const showHideOptionsClasses = [classes.Match,showOptions]

    return (
        <React.Fragment>

            <div
                className={classes.Match}
                // onClick={() => props.matchButtonClicked(props.match)}
            // onMouseEnter={() => setShowHideOptionsHandler(classes.ShowOptions)}
            // onMouseLeave={() => setShowHideOptionsHandler(classes.HideOptions)}
            >
            <div className={classes.Options}
            // onMouseEnter={() => setShowHideOptionsHandler(classes.ShowOptions)}
            // onMouseLeave={() => setShowHideOptionsHandler(classes.ShowOptions)} 
            >
                <div
                    style={closeButtonStyle}
                    className={showOptions === true ? classes.ShowOptions : classes.HideOptions}
                    onClick={(teamId) => props.removeMatchClicked(teamId)}
                ></div>
            </div>
                {/* <div>Afbeelding komt hier</div> */}
                <div className={classes.GameDate} onClick={() =>    goToMatchPageHandler()}>{dateFormat()}</div>
                {props.admin ? <div className={classes.MoreOptions} >
                    <div
                        style={moreButtonStyle}
                        className={classes.MoreButton}
                        onClick={() => setShowHideOptionsHandler()}
                    />
                </div> : null}
                <div className={classes.OpponentName} onClick={() =>    goToMatchPageHandler()}>
                    {/* <Link to={"/Team/" + props.team.teamId + "/Match/" + props.match.matchId} style={{ textDecoration: 'none' }}> */}
                        <div className={classes.Opponent}>{typeof props.match.gameData.opponent === 'undefined' ? null : props.match.gameData.opponent}</div>
                    {/* </Link> */}
                </div>
                <div className={classes.Score} onClick={() =>    goToMatchPageHandler()}>{homeGoals} - {props.match.oponentGoals}</div>

            </div>

        </React.Fragment>
    )
}

export default Match