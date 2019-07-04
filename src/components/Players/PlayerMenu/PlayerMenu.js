import React from 'react';
import classes from './PlayerMenu.css';
import Button from '../../UI/Button/ButtonStandard/ButtonStandard';
import { checkIfUidIsAdmin, checkIfOwner } from '../../../store/utility';

const playerMenu = (props) => {
    const AdminButton = () => {
        if (checkIfOwner(props.adminUid, props.player.userid)) {
            return null;
        }
        if (!checkIfUidIsAdmin(props.admins, props.player.userid)) {
            return (
                <Button
                    color={'green'}
                    disabled={false}
                    buttonClicked={() => props.makePlayerAdmin(props.player.userid)}
                >Maak beheerder</Button>
            )
        }
        else {
            return (
                <Button
                    color={'red'}
                    disabled={false}
                    buttonClicked={() => props.deletePlayerAdmin(props.player.userid)}
                >Verwijder als beheerder</Button>
            )
        }
    }
    return (
        <div className={classes.PlayerMenuContainer}>
            <div className={classes.NameAndNumber}>
                <div className={classes.Name}>{props.player.voornaam} {props.player.familienaam}</div>
                <div className={classes.PlayerNumber}>{props.player.playerNumber}</div>
            </div>
            <AdminButton />
            <Button
                color={'red'}
                disabled={false}
                buttonClicked={() => props.deletePlayer(props.player.userid)}
            >Verwijderen</Button>
        </div>
    )
}

export default playerMenu;