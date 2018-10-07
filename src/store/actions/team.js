import * as actionTypes from './actionTypes';
import axios from '../../axios-scoreapp';
import firebase from '../../firebase-scoreapp';

export const addTeamSuccess = () => {
    return{
        type: actionTypes.ADD_TEAM_SUCCESS,
    }
}

export const addTeamFail = (error) => {
    return{
        type: actionTypes.ADD_TEAM_FAIL,
        error:error
    }
}
export const addTeamStart = () => {
    return{
        type: actionTypes.ADD_TEAM_START,
    }
}



export const addTeam = (teamData) => {
    return dispatch => {
        dispatch(addTeamStart());
        axios.post('/Teams.json', teamData)
        .then(res => {
            dispatch(addTeamSuccess());
        })
        .catch(
            error => {
                dispatch(addTeamFail(error))
            }
        );
    }
}


export const getTeamSuccess = (selectedTeam) => {
    return{
        type: actionTypes.ADD_TEAM_SUCCESS,
        selectedTeam: selectedTeam,
    }
}

export const getTeamFail = (error) => {
    return{
        type: actionTypes.ADD_TEAM_FAIL,
        error:error
    }
}
export const getTeamStart = () => {
    return{
        type: actionTypes.ADD_TEAM_START,
    }
}

export const getTeam = (teamId) => {
    return dispatch =>{
        dispatch(getTeamStart());
    firebase.database().ref('/Teams/' + teamId).once('value').then(res => {

        const team = res.val();
        if (team.TeamMembers) {
            const players = Object.keys(team.TeamMembers);
            firebase.database().ref('/players').once('value').then(allPlayers => {
                const allTeamMembers = allPlayers.val();
                const filteredPlayers = this.pick(allTeamMembers, players);
                for (let key in filteredPlayers) {
                    filteredPlayers[key] = {
                        ...filteredPlayers[key],
                        playerNumber: team.TeamMembers[key].number,
                    }
                }
                dispatch(getTeamSuccess({
                    ...team,
                    teamId: teamId, 
                    filteredPlayers: filteredPlayers,
                }));
            })
            .catch(
                error => {
                    dispatch(getTeamFail(error))
                }
            );
        }
    })
    }
}

export const setSelectedTeam = (team) => {
    return{
        type: actionTypes.SET_SELECTED_TEAM,
        selectedTeam: team, 
    }
}