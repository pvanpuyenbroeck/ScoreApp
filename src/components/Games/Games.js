import React from 'react';
import classes from './Games';
import AddGame from '../../containers/TeamControl/AddGame/AddGame';
import Button from '../UI/Button/Button';
const games = (props) => {
    console.log(props);
    let allGames = <h1>Er zijn geen geplande matches</h1>
    // let allGames =
    //     props.matches.map(game => {
    //         console.log(game);
    //     })
    return (

        <div className={classes.Games}>
            <Button
                path={"/Team/ " + props.teamId + "/addGame"}>
                Match Toevoegen
                </Button>
            <div>

            </div>
            {allGames}
        </div>
    )
}

export default games;