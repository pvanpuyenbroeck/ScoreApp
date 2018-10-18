import * as actionTypes from './actionTypes';
import firebase from '../../firebase-scoreapp';


export const setSelectedMatchInfo = (selectedMatch) => {
    return{
        type: actionTypes.SET_SELECTED_MATCH,
        selectedMatch: selectedMatch,
    }
}

export const setMatchInfo = (updatedMatch) => {
    return{
        type: actionTypes.SET_SELECTED_MATCH,
        selectedMatch: updatedMatch,
    }
}

export const setPlayersMatch = (players) => {
    return{
        type: actionTypes.SET_MATCH_PLAYERS,
        players: players,
    }
}

export const setMatchPlayersSuccess = (players) => {
    return{
        type:actionTypes.SET_MATCH_PLAYERS_SUCCESS,
        players:players,
    }
}

export const setMatchPlayersFail = () => {
    return{
        type:actionTypes.SET_MATCH_PLAYERS_FAIL,
    }
}

export const setMatchPlayersStart = () => {
    return{
        type:actionTypes.SET_MATCH_PLAYERS_START,
    }
}

export const setMatchPlayers = (players, teamId, matchId) => {
    return dispatch => {
        dispatch(setPlayersMatch(players));
        dispatch(setMatchPlayersStart());
        firebase.database().ref('/Teams/' + teamId + '/Matches/' + matchId + '/Participants').set(players)
        .then(response => {
            dispatch(setMatchPlayersSuccess());
            console.log(response);
        })
        .catch(err => {
            dispatch(setMatchPlayersFail(err))
        })
    }
}

