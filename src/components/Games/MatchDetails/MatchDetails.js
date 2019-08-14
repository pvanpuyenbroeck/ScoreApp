import React from 'react';
import classes from './MatchDetails.css';
import Button from '../../UI/Button/ButtonStandard/ButtonStandard';
import { dateFormatToString } from '../../../store/utility';
import CountDown from '../../UI/CountDownClock/CountDownClock';
import Maps from '../../UI/Maps/maps';

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

    return (
        <React.Fragment>
            <div className={classes.MatchDetailsContainer}>
                <div className={[classes.GameData, classes.LabelContainer].join(' ')} style={style}>
                    <Section label={"Tegenstander: "} value={props.matches.gameData.opponent} />
                    <div className={classes.Location}>
                        <Section label={"Sporthal: "} value={props.matches.gameData.sporthal} />
                        <Section label={"Postcode: "} value={props.matches.gameData.locatie.postcode} />
                        <Section label={"Adres: "} value={props.matches.gameData.locatie.straat + " " + props.matches.gameData.locatie.nummer} />
                    </div>
                    <div className={classes.MatchDate}>
                        <Section label={"Speeldatum: "} value={dateFormatToString(props.matches.gameData.date)} />
                    </div>
                    <CountDown dateTime={props.matches.gameData.date} />
                </div>
                <Maps
                    street={props.matches.gameData.locatie.straat}
                    postcode={props.matches.gameData.locatie.postcode}
                    postnumber={props.matches.gameData.locatie.nummer}
                />
                <Button
                    color="red"
                    buttonClicked={() => props.removeMatchClicked()}
                    hide={props.hideRemoveButton}
                    className={classes.DeleteButton}
                >
                    Match verwijderen
            </Button>
                <Button
                    color="green"
                    buttonClicked={() => props.joinMatchClicked()}
                    hide={props.hideRemoveButton}
                    className={classes.JoinButton}
                >
                    Match verwijderen
            </Button>
                {props.Button}

            </div>
        </React.Fragment>
    )
}

export default MatchDetails;