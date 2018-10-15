import * as actionTypes from '../actions/actionTypes';
// import { setMatchInfo } from '../actions';

const initialState = {
    selectedMatch:{},
    selectedPlayers: null,
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
        selectedPlayers: action.players,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_SELECTED_MATCH:
        return setSelectedMatch(state, action);
        case actionTypes.SET_MATCH_PLAYERS:
        return setMatchPlayers(state,action);
        // return setMatchInfo(state,action);
        default: return state;
    }

}

export default reducer;