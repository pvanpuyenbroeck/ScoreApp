import React from 'react';
import classes from './TeamFunctionMenu.css';
import Button from '../../UI/Button/Button';
import {connect} from 'react-redux';

const teamFunctionMenu = (props) => {
    return (
        <div className={classes.TeamFunctionMenu}>
            <Button
                path={props.url + "/selectPlayers"}>
                <div>Speler Toevoegen</div>
            </Button>
            <Button
                path={"/Team/" + props.team.teamId + "/addGame"}>
                Match Toevoegen
            </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        team: state.team,
    }
}


export default connect(mapStateToProps)(teamFunctionMenu)