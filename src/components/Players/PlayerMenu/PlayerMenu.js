import React from 'react';
import classes from './PlayerMenu.css';
import Button from '../../UI/Button/Button/Button';

const playerMenu = (props) => {
    return(
        <div className={classes.PlayerMenuContainer}>
        <div className={classes.NameAndNumber}>
            <div className={classes.Name}>{props.player.voornaam} {props.player.familienaam}</div>
            <div className={classes.PlayerNumber}>{props.player.playerNumber}</div>
        </div>
            <Button
            disabled={false}
            btnType={'Succes'}
            >Maak beheerder</Button>
        </div>
    )
}

export default playerMenu;