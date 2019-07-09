import React from 'react';
import classes from './PlayerMenu.css';
import Button from '../../UI/Button/ButtonStandard/ButtonStandard';
import { checkIfUidIsAdmin, checkIfOwner } from '../../../store/utility';
import DetailsContainer from '../../UI/DetailsContainer/DetailsContainer';

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
        <DetailsContainer closeContainer={props.closeContainer}>
            <div className={classes.NameAndNumber}>
                <div className={classes.Name}>{props.player.voornaam} {props.player.familienaam}</div>
                <div className={classes.PlayerNumber}>{props.player.playerNumber}</div>
            </div>
            {props.adminLoggedIn ? <AdminButton /> : null}
            {props.adminLoggedIn ? <Button
                color={'red'}
                disabled={false}
                buttonClicked={() => props.deletePlayer(props.player.userid)}
            >Verwijderen</Button> : null}
        </DetailsContainer>
    )
}

export default playerMenu;