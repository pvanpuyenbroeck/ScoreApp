import * as actionTypes from './actionTypes';
import firebase from '../../firebase-scoreapp';
import {getTeam} from './team';


export const setSelectedMatchInfo = (selectedMatch) => {
    return {
        type: actionTypes.SET_SELECTED_MATCH,
        selectedMatch: selectedMatch,
    }
}

export const setMatchInfo = (updatedMatch) => {
    return {
        type: actionTypes.SET_SELECTED_MATCH,
        selectedMatch: updatedMatch,
    }
}

export const setPlayersMatch = (players) => {
    return {
        type: actionTypes.SET_MATCH_PLAYERS,
        players: players,
    }
}

export const setMatchPlayersSuccess = (players) => {
    return {
        type: actionTypes.SET_MATCH_PLAYERS_SUCCESS,
        players: players,
    }
}

export const setMatchPlayersFail = () => {
    return {
        type: actionTypes.SET_MATCH_PLAYERS_FAIL,
    }
}

export const setMatchPlayersStart = () => {
    return {
        type: actionTypes.SET_MATCH_PLAYERS_START,
    }
}

export const setMatchPlayers = (players, teamId, matchId, selectedSeason) => {
    return dispatch => {
        dispatch(setPlayersMatch(players));
        dispatch(setMatchPlayersStart());
        firebase.database().ref('/Teams/' + teamId + '/Seasons/' + selectedSeason + '/Matches/'  + matchId + '/Participants').set(players)
            .then(response => {
                dispatch(setMatchPlayersSuccess());
                console.log(response);
            })
            .catch(err => {
                dispatch(setMatchPlayersFail(err))
            })
    }
}

export const getMatchPlayers = (teamId, matchId) => {
    return dispatch => {
        dispatch(setMatchPlayersStart());
        firebase.database().ref('/Teams/' + teamId + '/Matches/' + matchId + '/Participants').once('value')
            .then(participants => {
                dispatch(setMatchPlayersSuccess(participants));
                console.log(participants);
            })
            .catch(err => {
                dispatch(setMatchPlayersFail(err))
            })
    }
}

export const saveMatchStatsStart = () => {
    return {
        type: actionTypes.SAVE_MATCHSTATS_START,
    }
}
export const saveMatchStatsSuccess = () => {
    return {
        type: actionTypes.SAVE_MATCHSTATS_SUCCESS,
    }
}
export const saveMatchStatsFail = () => {
    return {
        type: actionTypes.SAVE_MATCHSTATS_FAIL,
    }
}
export const saveMatch = (teamId, matchId, match, season) => {
    return dispatch => {
        //start save matchStats
        dispatch(saveMatchStatsStart())
        firebase.database().ref('/Teams/' + teamId + '/Seasons/' + season + '/Matches/' + matchId).set(match)
            .then(response => {
                //save succesfull
                console.log(response);
                dispatch(saveMatchStatsSuccess());
            }).catch(err => {
                //error message
                dispatch(saveMatchStatsFail());
                console.log(err);
            })
    }
}

export const loadMatchStats = () => {
    return dispatch => {

    }
}

export const updateOponentGoals = (goals) => {
    return {
        type: actionTypes.OPONENTGOAL_UPDATE,
        goals: goals,
    }
}

export const setFalseSaveState = () => {
    return {
        type: actionTypes.SET_FALSE_SAVE_STATE,
    }
}

export const addMatchStart = () => {
    return {
        type: actionTypes.ADD_MATCH_START
    }
}
export const addMatchSuccess = () => {
    return {
        type: actionTypes.ADD_MATCH_SUCCESS
    }
}
export const addMatchFail = (error) => {
    return {
        type: actionTypes.ADD_MATCH_FAIL,
        error: error,
    }
}

export const addMatch = (newMatch, team, season, uid) => {
    // const updatedTeam = { ...team };
    // team.Matches = { ...team.Matches, newMatch };
    return dispatch => {    
        dispatch(addMatchStart());
        firebase.database().ref('/Teams/' + team.teamId + '/Seasons/' + season + '/Matches').push(newMatch).then(response => {
            dispatch(addMatchSuccess());
            dispatch(getTeam(team.teamId, season, uid));
        }).catch(error => {
            dispatch(addMatchFail(error));
        })
    }
}