import React from 'react';
import PlayersButton from '../../Players/PlayerButton/PlayerButton';

const addPlayersToMatch = props => {
    props.teamMembers.map(player => {
        console.log(player);
    })
    return(
        <div>

        </div>
    )
}

export default addPlayersToMatch;