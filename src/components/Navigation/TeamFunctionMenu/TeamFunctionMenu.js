import React from 'react';
import classes from './TeamFunctionMenu.css';
import ButtonTeamMenu from '../../UI/ButtonTeamMenu/ButtonTeamMenu';
import {connect} from 'react-redux';

const teamFunctionMenu = (props) => {
    return (
        <div className={classes.TeamFunctionMenu}>
            <ButtonTeamMenu
                path={props.url + "/selectPlayers"}>
                <div>Speler Toevoegen</div>
            </ButtonTeamMenu>
            <ButtonTeamMenu
                path={"/Team/" + props.team.teamId + "/addGame"}>
                Match Toevoegen
            </ButtonTeamMenu>
            <ButtonTeamMenu
            path={"/Team/" + props.team.teamId + "/addGame"}>
            Match Toevoegen
        </ButtonTeamMenu>
        <ButtonTeamMenu
        path={"/Team/" + props.team.teamId + "/addGame"}>
        Match Toevoegen
    </ButtonTeamMenu>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        team: state.team,
    }
}


export default connect(mapStateToProps)(teamFunctionMenu)