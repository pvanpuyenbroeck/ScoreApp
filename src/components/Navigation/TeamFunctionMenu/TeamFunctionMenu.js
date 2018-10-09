import React, { Component } from 'react';
import classes from './TeamFunctionMenu.css';
import ButtonTeamMenu from '../../UI/ButtonTeamMenu/ButtonTeamMenu';
import { connect } from 'react-redux';

const teamFunctionMenu = (props) => {
    let attachedClasses = [classes.TeamFunctionMenu, classes.Closed]
    console.log(props.showFunctionMenu);
    if (props.showFunctionMenu === true) {
        attachedClasses.pop();
    }
    return (
        <div className={attachedClasses.join(' ')}>
            <ButtonTeamMenu buttonClicked={() => props.showComponent("SelectPlayer")}>
                <div>Speler Toevoegen</div>
            </ButtonTeamMenu>

            <ButtonTeamMenu buttonClicked={() => props.showComponent("AddMatch")}>
                Match Toevoegen
                </ButtonTeamMenu>

        </div>
    )

}

// const mapStateToProps = state => {
//     return{
//         team: state.team.selectedTeam,
//         showFunctionMenu: state.navigation.showFunctionMenu,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         showComponent: (component) => dispatch({type:"showComponent", navItem:component})
//     }
// }


export default teamFunctionMenu;