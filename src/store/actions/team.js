import * as actionTypes from './actionTypes';
import firebase from '../../firebase-scoreapp';
import { checkIfAdmin } from '../utility';


export const updateSelectedTeam = (updatedTeam) => {
    return{
        type: actionTypes.UPDATE_SELECTED_TEAM,
        team:updatedTeam,
    }
}

export const addTeamSuccess = (teamData) => {
    return {
        type: actionTypes.ADD_TEAM_SUCCESS,
        newTeam: teamData,
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
            // console.log(res.val());
            dispatch(addTeamSuccess(teamData));
            dispatch(closeModal());
            dispatch(getAllTeams());
        }).catch(
            error => {
                dispatch(addTeamFail(error))
            }
        );
    }
}

export const setLastSelectedTeamSuccess = (selectedTeam) => {
    // selectedTeam(selectedTeam);
    return {
        type: actionTypes.SET_LAST_SELECTED_TEAM_SUCCESS,
        selectedTeam: selectedTeam,
    }
}

export const setLastSelectedTeamFail = (error) => {
    return {
        type: actionTypes.SET_LAST_SELECTED_TEAM_FAIL,
        error: error
    }
}
export const setLastSelectedTeamStart = () => {
    return {
        type: actionTypes.SET_LAST_SELECTED_TEAM_START,
    }
}

const setLastSelectedTeam = (selectedTeamId, uid, season) => {
    setLastSelectedTeamStart();
    firebase.database().ref('/Players/' + uid + "/lastSelectedTeam/").set({
        teamId: selectedTeamId,
    }).then(response => {
        console.log("Succes lastselectedTeam")
        setLastSelectedTeamSuccess();
    })
        .catch(
            console.log("Fail lastselectedTeam")
            // dispatch(setLastSelectedTeamFail())
        )
}


export const getTeamSuccess = (selectedTeam, uid, isAdmin) => {
    setLastSelectedTeam(selectedTeam.teamId, uid);
    return {
        type: actionTypes.GET_TEAM_SUCCESS,
        selectedTeam: selectedTeam,
        isAdmin: isAdmin,
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

export const getTeam = (teamId, season, uid) => {
    return dispatch => {
        dispatch(getTeamStart());
        firebase.database().ref('/Teams/' + teamId).once('value').then(res => {
            const team = res.val();
            console.log(team);
            const isAdmin = checkIfAdmin(team.admins, uid, team.admin);
            // const TeamMembersAvailable = team[season].TeamMembers === undefined;
            if (season in team.Seasons) {
                if (typeof team.Seasons[season].TeamMembers !== 'undefined') {
                    const players = Object.keys(team.Seasons[season].TeamMembers);
                    firebase.database().ref('/Players').once('value').then(allPlayers => {
                        const allTeamMembers = allPlayers.val();
                        console.log(allTeamMembers);
                        const filteredPlayers = pick(allTeamMembers, players);
                        for (let key in filteredPlayers) {
                            filteredPlayers[key] = {
                                ...filteredPlayers[key],
                                playerNumber: team.Seasons[season].TeamMembers[key].number,
                            }
                        }
                        const updatedTeam = { ...team };
                        updatedTeam.Seasons[season].filteredPlayers = filteredPlayers;
                        dispatch(getTeamSuccess({
                            ...updatedTeam,
                            teamId: teamId,
                            isAdmin: isAdmin,
                        }, uid));
                    })
                }
                dispatch(getTeamSuccess({
                    ...team,
                    teamId: teamId,
                    isAdmin: isAdmin,
                }, uid));
            }
        }).catch(
            error => {
                dispatch(getTeamFail(error))
            }
        )
    }
}

export const getLastSelectedTeamStart = () => {
    return {
        type: actionTypes.GET_LAST_SELECTED_TEAM_START,
    }
}
export const getLastSelectedTeamFail = () => {
    return {
        type: actionTypes.GET_LAST_SELECTED_TEAM_FAIL,
    }
}
export const getLastSelectedTeamSuccess = () => {
    return {
        type: actionTypes.GET_LAST_SELECTED_TEAM_SUCCESS,
    }
}

export const getLastSelectedTeam = (userId, lastSelectedSeason) => {
    return dispatch => {
        dispatch(getLastSelectedTeamStart());
        firebase.database().ref("/Players/" + userId + "/lastSelectedTeam/").once('value')
            .then(teamId => {
                dispatch(getTeam(teamId.val().teamId, lastSelectedSeason, userId));
                dispatch(getLastSelectedTeamSuccess());
            })
            .catch(error => {
                console.log(error);
                dispatch(getLastSelectedTeamFail());
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

export const addPlayerToTeamSuccess = (updatedTeam) => {
    return {
        type: actionTypes.ADD_PLAYER_TO_TEAM_SUCCESS,
        loading: false,
        updatedTeam: updatedTeam,
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
    let updatedSeason = { ...updatedTeam.Seasons }
    let updatedFilteredPlayers = { ...updatedSeason[season].filteredPlayers }
    for (let key in updatedFilteredPlayers) {
        updatedFilteredPlayers[key] = {
            ...updatedFilteredPlayers[key],
            playerNumber: updatedTeamMembers[key].number,
        }
    }
    updatedTeam = {
        ...updatedTeam,
        Seasons: {
            ...updatedSeason,
            [season]: {
                ...updatedSeason[season],
                TeamMembers: updatedTeamMembers,
                filteredPlayers: {
                    ...updatedFilteredPlayers,

                }
            }
        }
    }
    // updatedTeam[season].TeamMembers = updatedTeamMembers;
    return dispatch => {
        dispatch(addPlayerToTeamStart(updatedTeam));
        firebase.database().ref('/Teams/' + team.teamId + '/Seasons/' + season + '/TeamMembers/').set(updatedTeamMembers)
            .then(response => {
                dispatch(addPlayerToTeamSuccess(updatedTeam));
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
    const updatedTeam = { ...team };
    updatedTeam.Seasons[season].TeamMembers = updatedTeamMembers;
    return dispatch => {
        dispatch(removePlayerStart());
        firebase.database().ref('/Teams/' + teamid + "/Seasons/" + season + "/TeamMembers/").set(updatedTeamMembers)
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

export const getAllTeams = (userId = null) => {
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
        firebase.database().ref('/Teams/' + teamId + '/Seasons/' + selectedSeason + '/Matches/').set(updatedMatches)
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
    return {
        type: actionTypes.SET_SEASON,
        season: season,
    }
}

export const updatePlayerAdminStart = () => {
    return {
        type: actionTypes.UPDATE_PLAYER_ADMIN_START,
    }
}

export const updatePlayerAdminFail = () => {
    return {
        type: actionTypes.UPDATE_PLAYER_ADMIN_FAIL,
    }
}
export const updatePlayerAdminSuccess = (updatedTeam) => {
    return {
        type: actionTypes.UPDATE_PLAYER_ADMIN_SUCCESS,
        updatedTeam: updatedTeam,
    }
}

export const updatePlayerAdmins = (teamId, updatedAdmins) => {
    return dispatch => {
        dispatch(updatePlayerAdminStart());
        firebase.database().ref('/Teams/' + teamId + '/admins/').set(updatedAdmins.admins)
            .then(response => {
                dispatch(updatePlayerAdminSuccess(updatedAdmins));
            }).catch(err => {
                dispatch(updatePlayerAdminFail());
            })
    }
}