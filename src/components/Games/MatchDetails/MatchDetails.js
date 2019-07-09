import React from 'react';
import classes from './MatchDetails.css';
import Button from '../../UI/Button/ButtonStandard/ButtonStandard';
import DetailsContainer from '../../UI/DetailsContainer/DetailsContainer';
import {dateFormatToString} from '../../../store/utility';

const MatchDetails = (props) => {
    const Section = ({CSSclass, label, value}) => {
        const SectionStyle = [CSSclass, classes.Section];
        return(
            <div className={SectionStyle.join(' ')}>
            <div>{label}</div>
            <div>{value}</div>
        </div>
        )
    }

    return(
        <DetailsContainer closeContainer={props.closeContainer} >
            <h1>Matchdetails</h1>
            <div className={[classes.GameData, classes.LabelContainer].join(' ')}>
                <Section label={"Tegenstander: "} value={props.matches.gameData.opponent}/>
                <div className={classes.Location}>
                    <Section label={"Sporthal: "} value={props.matches.gameData.sporthal}/>
                    <Section label={"Postcode: "} value={props.matches.gameData.postcode}/>
                    <Section label={"Straat: "} value={props.matches.gameData.straat}/>
                </div>
                <div className={classes.MatchDate}>
                    <Section label={"Speeldatum: "} value={dateFormatToString(props.matches.gameData.date)}/>
                </div>
            </div>
            <Button
            color="red"
            buttonClicked={() => props.removeMatchClicked(props.matches.matchId)}
            >
                Match verwijderen
            </Button>
        </DetailsContainer>
    )
}

export default MatchDetails;