import React from 'react';
import classes from './MatchDetails.css';
import Button from '../../UI/Button/ButtonStandard/ButtonStandard';
import { dateFormatToString } from '../../../store/utility';
import CountDown from '../../UI/CountDownClock/CountDownClock';
import Maps from '../../UI/Maps/maps';
import {Match} from '../../../models/teamModel';

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
        width: props.width,
    }

    const selectedMatch = new Match(props.matches);

    return (
        <React.Fragment>
            <div className={classes.MatchDetailsContainer}>
                <div className={[classes.GameData, classes.LabelContainer].join(' ')} style={style}>
                    <Section label={"Tegenstander: "} value={selectedMatch.gameData.opponent} />
                    <div className={classes.Location}>
                        <Section label={"Sporthal: "} value={selectedMatch.gameData.sporthal} />
                        <Section label={"Postcode: "} value={selectedMatch.gameData.locatie.postcode} />
                        <Section label={"Adres: "} value={selectedMatch.gameData.locatie.straat + " " + selectedMatch.gameData.locatie.nummer} />
                    </div>
                    <div className={classes.MatchDate}>
                        <Section label={"Speeldatum: "} value={dateFormatToString(selectedMatch.gameData.date)} />
                    </div>
                    <CountDown dateTime={selectedMatch.gameData.date} />
                </div>
                <Maps
                    street={selectedMatch.gameData.locatie.straat}
                    postcode={selectedMatch.gameData.locatie.postcode}
                    postnumber={selectedMatch.gameData.locatie.nummer}
                />
                {props.isAdmin ? <Button
                    color="red"
                    buttonClicked={() => props.removeMatchClicked()}
                    hide={props.hideRemoveButton}
                    className={classes.DeleteButton}
                >
                    Match verwijderen
            </Button> : null}
                {props.Button}

            </div>
        </React.Fragment>
    )
}

export default MatchDetails;