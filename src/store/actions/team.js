import * as actionTypes from './actionTypes';
import firebase from '../../firebase-scoreapp';

export const addTeamSuccess = (teamData) => {
    return {
        type: actionTypes.ADD_TEAM_SUCCESS,
        newTeam:teamData,
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
            dispatch(addTeamSuccess(teamData));
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

export const getTeam = (teamId, season) => {
    return dispatch => {
        dispatch(getTeamStart());
        firebase.database().ref('/Teams/' + teamId).once('value').then(res => {
            const team = res.val();
            console.log(team);
            // const TeamMembersAvailable = team[season].TeamMembers === undefined;
            if (season in team) {
                const players = Object.keys(team[season].TeamMembers);
                firebase.database().ref('/Players').once('value').then(allPlayers => {
                    const allTeamMembers = allPlayers.val();
                    const filteredPlayers = pick(allTeamMembers, players);
                    for (let key in filteredPlayers) {
                        filteredPlayers[key] = {
                            ...filteredPlayers[key],
                            playerNumber: team[season].TeamMembers[key].number,
                        }
                    }
                    const updatedTeam = {...team};
                    updatedTeam[season].filteredPlayers = filteredPlayers;
                    dispatch(getTeamSuccess({
                        ...updatedTeam,
                        teamId: teamId,
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
    let updatedTeam = { ...team };
    updatedTeam = {
        ...updatedTeam,
        [season]:{
            ...season,
            TeamMembers: updatedTeamMembers
        }
    }
    // updatedTeam[season].TeamMembers = updatedTeamMembers;
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

export const removePlayerSuccess = (updatedTeam) => {
    return {
        type: actionTypes.REMOVE_PLAYER_SUCCESS,
        updatedTeam: updatedTeam,
    }
}
export const removePlayerFail = (err) => {
    return {
        type: actionTypes.REMOVE_PLAYER_FAIL,
        error: err,
    }
}
export const removePlayerFromTeam = (playerid, teamid, activePlayers, season, team) => {
    let updatedTeamMembers = { ...activePlayers };
    updatedTeamMembers[playerid] = {
        ...updatedTeamMembers[playerid],
        active: false,
    }
    const updatedTeam = {...team};
    updatedTeam[season].TeamMembers = updatedTeamMembers;
    return dispatch => {
        dispatch(removePlayerStart());
        firebase.database().ref('/Teams/' + teamid + "/" + season + "/TeamMembers/").set(updatedTeamMembers)
            .then(response => {
                dispatch(removePlayerSuccess(updatedTeam));
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

export const removeMatchFromTeam = (updatedMatches, teamId, selectedSeason) => {
    return dispatch => {
        dispatch(removeMatchStart());
        firebase.database().ref('/Teams/' + teamId + '/' + selectedSeason + '/Matches/').set(updatedMatches)
            .then(response => {
                dispatch(removeMatchSuccess(updatedMatches, selectedSeason));
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

export const removeMatchSuccess = (updatedMatches, selectedSeason) => {
    return {
        type: actionTypes.REMOVE_MATCH_SUCCESS,
        updatedMatches: updatedMatches,
        selectedSeason: selectedSeason,
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
