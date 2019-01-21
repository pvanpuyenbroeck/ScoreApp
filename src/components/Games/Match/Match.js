import React from 'react';
import classes from './Match.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Match = (props) => {
    let homeGoals = 0;
    for (let key in props.match.Participants) {
        homeGoals += props.match.Participants[key].goals;
    }
    const StyledLink = styled.div`
        width: 100%;
    height: 150px;
    background-color:#105187;
    display: inline-block;
    padding: 5px;
    box-sizing:border-box;
    border: 2px solid white;
    border-radius: 5px;
    text-decoration: none;
    color:#F0F1D5;
    text-align: center;
    `

    return (
        <Link to={"/Team/" + props.team.teamId + "/Match/" + props.match.matchId} style={{ textDecoration: 'none' }}>
            <StyledLink className={classes.Match} onClick={() => props.matchButtonClicked(props.match)}>
                {/* <div>Afbeelding komt hier</div> */}
                <div>
                    <div>{props.team.teamName}</div>
                    <div className={classes.OpponentName}>{props.team.teamName} - {typeof props.match.gameData.opponent === 'undefined' ? null : props.match.gameData.opponent}</div>
                    <div className={classes.Score}>{homeGoals} - {props.match.oponentGoals}</div>
                </div>
            </StyledLink>
        </Link>
    )
}

export default Match