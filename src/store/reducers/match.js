import * as actionTypes from '../actions/actionTypes';
// import { setMatchInfo } from '../actions';

const initialState = {
    selectedMatch:{},
    MatchPlayers: null,
    loading: false,
}

const setSelectedMatch = (state, action) => {
    return{
        ...state,
        selectedMatch: action.selectedMatch,
    }
} 

const setMatchPlayers = (state, action) => {
    console.log(action.players);
    return{
        ...state,
        MatchPlayers: action.players,
    }
}

const setMatchPlayersSuccess = (state, action) =>{
    return{
        ...state,
        loading: false,
        // MatchPlayers:action.players,
    }
}
const setMatchPlayersFail = (state, action) =>{
    return{
        ...state,
        loading: true,
    }
}
const setMatchPlayersStart = (state, action) =>{
    return{
        ...state,
        loading: true,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_SELECTED_MATCH:
        return setSelectedMatch(state, action);
        case actionTypes.SET_MATCH_PLAYERS:
        return setMatchPlayers(state,action);
        case actionTypes.SET_MATCH_PLAYERS_START:
        return setMatchPlayersStart(state, action);
        case actionTypes.SET_MATCH_PLAYERS_FAIL:
        return setMatchPlayersFail(state, action);
        case actionTypes.SET_MATCH_PLAYERS_SUCCESS:
        return setMatchPlayersSuccess(state, action);
        // return setMatchInfo(state,action);
        default: return state;
    }

}

export default reducer;