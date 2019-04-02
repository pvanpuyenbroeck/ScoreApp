import * as actionTypes from './actionTypes';
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

export const closeModal = () => {
    return {
        type: actionTypes.CLOSE_MODAL,
    }
}



export const addTeam = (teamData) => {
    return dispatch => {
        dispatch(addTeamStart());
        firebase.database().ref("/Teams/").push(teamData).then(res => {
            dispatch(addTeamSuccess());
            dispatch(closeModal());
        }).catch(
            error => {
                dispatch(addTeamFail(error))
            }
        );
    }
}


export const getTeamSuccess = (selectedTeam) => {
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
        firebase.database().ref('/Teams/' + teamId).once('value').then(res => {
            const team = res.val();
            if (team.TeamMembers) {
                const players = Object.keys(team.TeamMembers);
                firebase.database().ref('/Players').once('value').then(allPlayers => {
                    const allTeamMembers = allPlayers.val();
                    const filteredPlayers = pick(allTeamMembers, players);
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

export const addPlayerToTeamStart = (updatedTeam) => {
    return {
        type: actionTypes.ADD_PLAYER_TO_TEAM_START,
        loading: true,
        updatedTeam: updatedTeam,
    }
}

export const addPlayerToTeamSuccess = () => {
    return {
        type: actionTypes.ADD_PLAYER_TO_TEAM_SUCCESS,
        loading: false,
    }
}

export const addPlayerToTeamFail = (error) => {
    return {
        type: actionTypes.ADD_PLAYER_TO_TEAM_FAIL,
        error: error,
        loading: false,
    }
}

export const closeFunctionModal = () => {
    return {
        type: actionTypes.CLOSE_MODAL,
    }
}

export const addPlayerToTeam = (team, updatedTeamMembers, season) => {
    const updatedTeam = { ...team };
    updatedTeam.TeamMembers = updatedTeamMembers;
    return dispatch => {
        dispatch(addPlayerToTeamStart(updatedTeam));
        firebase.database().ref('/Teams/' + team.teamId + '/' + season  + '/TeamMembers/').set(updatedTeamMembers)
            .then(response => {
                dispatch(addPlayerToTeamSuccess());
                dispatch(closeFunctionModal());
                // dispatch(getAllTeams());
            })
            .catch(error => {
                dispatch(addPlayerToTeamFail(error));
            })
        // window.location.reload()
        // this.props.closeModal(); 
    }
}

export const removePlayerStart = () => {
    return {
        type: actionTypes.REMOVE_PLAYER_START
    }
}

export const removePlayerSuccess = () => {
    return {
        type: actionTypes.REMOVE_PLAYER_SUCCESS
    }
}
export const removePlayerFail = (err) => {
    return {
        type: actionTypes.REMOVE_PLAYER_FAIL,
        error: err,
    }
}
export const removePlayerFromTeam = (playerid, teamid, activePlayers) => {
    let updatedTeamMembers = { ...activePlayers };
    updatedTeamMembers[playerid] = {
        ...updatedTeamMembers[playerid],
        active: false,
    }
    return dispatch => {
        dispatch(removePlayerStart());
        firebase.database().ref('/Teams/' + teamid + "/TeamMembers/").set(updatedTeamMembers)
            .then(response => {
                dispatch(removePlayerSuccess());
            }).catch(err => {
                dispatch(removePlayerFail(err));
            })
    }
}

export const getAllTeamSuccess = (teams) => {
    return {
        type: actionTypes.GET_ALL_TEAMS_SUCCESS,
        teams: teams,
    }
}


export const getAllTeamFail = (error) => {
    return {
        type: actionTypes.GET_ALL_TEAMS_FAIL,
        error: error,
    }
}


export const getAllTeamStart = () => {
    return {
        type: actionTypes.GET_ALL_TEAMS_START,
    }
}

export const getAllTeams = (userId = null, token = null) => {
    return dispatch => {
        dispatch(getAllTeamStart());
        firebase.database().ref('/Teams').once('value')
            .then(response => {
                const teams = response.val();
                const fetchedTeams = [];
                for (let key in teams) {
                    fetchedTeams.push({
                        ...teams[key],
                        id: key,
                    });
                }
                dispatch(getAllTeamSuccess(fetchedTeams));
            }).catch(error => {
                dispatch(getAllTeamFail(error));
            })
    }
}

export const removeMatchFromTeam = (updatedMatches, teamId) => {
    return dispatch => {
        dispatch(removeMatchStart());
        firebase.database().ref('/Teams/' + teamId + '/Matches/').set(updatedMatches)
            .then(response => {
                dispatch(removeMatchSuccess(updatedMatches));
            }).catch(err => {
                dispatch(removeMatchFail(err));
            })
    }
}

export const removeMatchStart = () => {
    return {
        type: actionTypes.REMOVE_MATCH_START,
    }
}

export const removeMatchFail = (error) => {
    return {
        type: actionTypes.REMOVE_MATCH_FAIL,
        error: error,
    }
}

export const removeMatchSuccess = (updatedMatches) => {
    return {
        type: actionTypes.REMOVE_MATCH_SUCCESS,
        updatedMatches: updatedMatches,
    }
}

export const getSeasons = () => {
    return dispatch => {
        firebase.database.ref('/Seasons').once('value')
            .then(response => {
                
            })
    }
}

export const setSeason = (season) => {
    return{
        type:actionTypes.SET_SEASON,
        season: season,
    }
}
