import * as actionTypes from '../actions/actionTypes';
// import { setMatchInfo } from '../actions';

const initialState = {
    selectedMatch:null,
    MatchPlayers: null,
    loading: false,
    oponentGoals: 0,
    matchSaved: true,
    matchAddStarted: false,
    error:"",
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
        selectedMatch: {
            ...state.selectedMatch,
            Participants: action.players,
        },
    }
}

const setMatchPlayersSuccess = (state, action) =>{
    return{
        ...state,
        loading: false,
        MatchPlayers:action.players,
    }
}
const setMatchPlayersFail = (state, action) =>{
    return{
        ...state,
        loading: false,
    }
}
const setMatchPlayersStart = (state, action) =>{
    return{
        ...state,
        loading: true,
    }
}

const oponentUpdateGoal = (state,action) => {
    return{
        ...state,
        selectedMatch: {
            ...state.selectedMatch,
            oponentGoals: action.goals,
        },
        matchSaved:false,
    }
}

const saveMatchStatsStart = (state,action) => {
    return{
        ...state,
        matchSaved:false,
    }
}
const saveMatchStatsSuccess = (state,action) => {
    return{
        ...state,
        matchSaved:true,
    }
}
const saveMatchStatsFail = (state,action) => {
    return{
        ...state,
        matchSaved:false,
    }
}

const setFalseSaveState = (state,action) => {
    return{
        ...state,
        matchSaved:false,
    }
}

const addMatchStart = (state,action) => {
    return{
        ...state,
        matchAddStarted: true,
    }
}

const addMatchFail = (state,action) => {
    return{
        ...state,
        matchAddStarted: false,
        error:action.error,
    }
}

const addMatchSuccess = (state,action) => {
    return{
        ...state,
        matchAddStarted: false,
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
        case actionTypes.OPONENTGOAL_UPDATE:
        return oponentUpdateGoal(state,action);
        case actionTypes.SAVE_MATCHSTATS_START:
        return saveMatchStatsStart(state,action);
        case actionTypes.SAVE_MATCHSTATS_SUCCESS:
        return saveMatchStatsSuccess(state,action);
        case actionTypes.SAVE_MATCHSTATS_FAIL:
        return saveMatchStatsFail(state,action);
        case actionTypes.SET_FALSE_SAVE_STATE:
        return setFalseSaveState(state,action);
        case actionTypes.ADD_MATCH_START:
        return addMatchStart(state,action)
        case actionTypes.ADD_MATCH_FAIL:
        return addMatchFail(state, action);
        case actionTypes.ADD_MATCH_SUCCESS:
        return addMatchSuccess(state, action);
        // return setMatchInfo(state,action);
        default: return state;
    }

}

export default reducer;