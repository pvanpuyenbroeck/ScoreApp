import React from 'react';
import classes from './PlayerMenu.css';
import Button from '../../UI/Button/ButtonStandard/ButtonStandard';

const playerMenu = (props) => {
    return (
        <div className={classes.PlayerMenuContainer}>
            <div className={classes.NameAndNumber}>
                <div className={classes.Name}>{props.player.voornaam} {props.player.familienaam}</div>
                <div className={classes.PlayerNumber}>{props.player.playerNumber}</div>
            </div>
            <Button
                color={'green'}
                disabled={false}
                buttonClicked = {() => props.makePlayerAdmin(props.player.userid)}
            >Maak beheerder</Button>
            <Button
                color={'red'}
                disabled={false}
                buttonClicked={() => props.deletePlayer(props.player.userid)}
            >Verwijderen</Button>
        </div>
    )
}

export default playerMenu;