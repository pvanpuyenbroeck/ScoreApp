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
    const TeamName = styled.div`
        width:100%;
        color: ${colors.blue};
        ${'' /* background-color: ${colors.beige}; */}
        text-align:left;
    `
    const OponentName = styled.div`
        font-size:1.5rem;
        font-weight: bold;
    `
    const dateFormat = () => {
        let date = new Date(props.match.gameData.date);
        const day = date.getDate();
        const month = date.getMonth() + 1
        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return `${day}-${month}-${year}  ${hour}:${minutes}`
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
            <div className={showOptions}>
                <div
                    style={closeButtonStyle} 
                    className={classes.CloseButton} 
                ></div>
            </div>
            <Link to={"/Team/" + props.team.teamId + "/Match/" + props.match.matchId} style={{ textDecoration: 'none' }}>
                <StyledLink
                    className={classes.Match}
                    onClick={() => props.matchButtonClicked(props.match)}
                    onMouseEnter={() => setShowHideOptionsHandler(classes.ShowOptions)}
                    onMouseLeave={() => setShowHideOptionsHandler(classes.HideOptions)}
                >
                    {/* <div>Afbeelding komt hier</div> */}
                    <div>
                        <TeamName>{props.team.teamName}</TeamName>
                        <OponentName>
                            <div>{typeof props.match.gameData.opponent === 'undefined' ? null : props.match.gameData.opponent}</div>
                        </OponentName>
                        <div className={classes.Score}>{homeGoals} - {props.match.oponentGoals}</div>
                        <div className={classes.GameDate}>{dateFormat()}</div>
                    </div>
                </StyledLink>
            </Link>
        </React.Fragment>
    )
}

export default Match