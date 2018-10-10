import * as actionTypes from './actionTypes';
import axios from '../../axios-scoreapp';
import firebase from '../../firebase-scoreapp';

export const addTeamSuccess = () => {
    return {
        type: actionTypes.ADD_TEAM_SUCCESS,
    }
}

export const addTeamFail = (error) => {
    return {
        type: actionTypes.ADD_TEAM_FAIL,
        error: error
    }
}
export const addTeamStart = () => {
    return {
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
    console.log(selectedTeam);
    return {
        type: actionTypes.GET_TEAM_SUCCESS,
        selectedTeam: selectedTeam,
    }
}

export const getTeamFail = (error) => {
    return {
        type: actionTypes.GET_TEAM_FAIL,
        error: error
    }
}
export const getTeamStart = () => {
    return {
        type: actionTypes.GET_TEAM_START,
    }
}

const pick = (obj, keys) => {
    return keys.map(k => k in obj ? { [k]: obj[k] } : {})
        .reduce((res, o) => Object.assign(res, o), {});
}

export const getTeam = (teamId) => {
    return dispatch => {
        dispatch(getTeamStart());
        console.log(firebase);
        firebase.database().ref('/Teams/' + teamId).once('value').then(res => {
            const team = res.val();
            console.log(res.val());
            if (team.TeamMembers) {
                const players = Object.keys(team.TeamMembers);
                firebase.database().ref('/players').once('value').then(allPlayers => {
                    const allTeamMembers = allPlayers.val();
                    const filteredPlayers = pick(allTeamMembers, players);
                    for (let key in filteredPlayers) {
                        console.log(key);
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
                    console.log(filteredPlayers);
                })
            } else {
                dispatch(getTeamSuccess({
                    ...team,
                    teamId: teamId,
                }));
            }
        }).catch(
            error => {
                dispatch(getTeamFail(error))
            }
        )
    }
}

export const addPlayerToTeamStart = () => {
    return {
        type: actionTypes.ADD_PLAYER_TO_TEAM_START,
        loading: true,
    }
}

export const addPlayerToTeamSuccess = () => {
    return {
        type: actionTypes.ADD_PLAYER_TO_TEAM_SUCCESS,
        loading: false,
    }
}

export const addPlayerToTeamFail = (error) => {
    return{
        type: actionTypes.ADD_PLAYER_TO_TEAM_FAIL,
        error: error,
        loading:false,
    }
}

export const closeFunctionModal = () => {
    return{
        type:actionTypes.CLOSE_MODAL,
    }
}
 
export const addPlayerToTeam = (teamId, updatedTeamMembers) => {
    console.log(updatedTeamMembers);
    return dispatch =>{
        dispatch(addPlayerToTeamStart());
        firebase.database().ref('/Teams/' + teamId + '/TeamMembers/').set(updatedTeamMembers)
            .then(response => {
                dispatch(addPlayerToTeamSuccess());
                dispatch(closeFunctionModal());
            })
            .catch(error => {
                dispatch(addPlayerToTeamFail(error));
            })
        window.location.reload()
        // this.props.closeModal(); 
    }
}