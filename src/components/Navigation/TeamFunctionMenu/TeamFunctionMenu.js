import React from 'react';
import classes from './TeamFunctionMenu.css';
import ButtonTeamMenu from '../../UI/ButtonTeamMenu/ButtonTeamMenu';

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
export default teamFunctionMenu;