import React, { useState } from 'react';
import classes from './MatchDetails.css';
import Button from '../../UI/Button/ButtonStandard/ButtonStandard';
import DetailsContainer from '../../UI/DetailsContainer/DetailsContainer';
import { dateFormatToString } from '../../../store/utility';
import CountDown from '../../UI/CountDownClock/CountDownClock';

const MatchDetails = (props) => {
    const Section = ({ CSSclass, label, value }) => {
        const SectionStyle = [CSSclass, classes.Section];
        return (
            <div className={SectionStyle.join(' ')}>
                <div>{label}</div>
                <div>{value}</div>
            </div>
        )
    }

    const style = {
        width:props.width,
    }

    return (
        <React.Fragment>
            <h1>Matchdetails</h1>
            <div className={[classes.GameData, classes.LabelContainer].join(' ')} style={style}>
                <Section label={"Tegenstander: "} value={props.matches.gameData.opponent} />
                <div className={classes.Location}>
                    <Section label={"Sporthal: "} value={props.matches.gameData.sporthal} />
                    <Section label={"Postcode: "} value={props.matches.gameData.postcode} />
                    <Section label={"Straat: "} value={props.matches.gameData.straat} />
                </div>
                <div className={classes.MatchDate}>
                    <Section label={"Speeldatum: "} value={dateFormatToString(props.matches.gameData.date)} />
                </div>
                <CountDown dateTime={props.matches.gameData.date} />
            </div>
            <Button
                color="red"
                buttonClicked={() => props.removeMatchClicked(props.matches.matchId)}
            >
                Match verwijderen
            </Button>
        </React.Fragment>
    )
}

export default MatchDetails;