import React from 'react';
import classes from './MatchDetails.css';
import Button from '../../UI/Button/ButtonStandard/ButtonStandard';
import DetailsContainer from '../../UI/DetailsContainer/DetailsContainer';

const MatchDetails = (props) => {


    return(
        <DetailsContainer closeContainer={props.closeContainer}>
            <h1>Matchdetails</h1>
            <div className={classes.OpponentName}>
                {props.matches.gameData.opponent}
            </div>
            <Button
            color="red"
            buttonClicked={() => props.removeMatchClicked(props.matches.matchId)}
            >
                Verwijderen
            </Button>
        </DetailsContainer>
    )
}

export default MatchDetails;