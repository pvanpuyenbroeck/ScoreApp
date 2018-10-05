import * as actionTypes from './actionTypes';

export const addTeam = (team) => {
    return{
        type: actionTypes.ADD_TEAM,
        teamToAdd: team,
    }
}