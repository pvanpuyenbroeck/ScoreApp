import React from 'react';
import classes from './Games';
import AddGame from '../../containers/TeamControl/AddGame/AddGame';

const games = (props) => {

    return (
        <div className={classes.Games}>
            <AddGame teamId={props.team.teamId}/>
        </div>
    )
}

export default games;