import React from 'react';
import classes from './MatchDetails.css';
import Button from '../../UI/Button/ButtonStandard/ButtonStandard';

const MatchDetails = (props) => {


    return(
        <div className={classes.MatchDetailsContainer}>
            <h1>Matchdetails</h1>
            <div className={classes.OpponentName}>
                {props.matches.gameData.opponent}
            </div>
            <Button
            color="red"
            buttonClicked={() => props.removeMatchClicked(props.team.teamId)}
            >
                Verwijderen
            </Button>
        </div>
    )
}

export default MatchDetails;