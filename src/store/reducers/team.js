
import * as actionTypes from '../actions/actionTypes';
const initialState = {
    loading: true,
    submitted: false,
    error: "",
    selectedTeam:{},
    sidePanelOpen: false,
    playerDetails:{},
    teams:{},
}

const addTeam = (state,action) => {
    return{
        ...state,
        loading: false,
        submitted: false,
    }
};

const addTeamSuccess = (state, action) => {
    return{
        ...state,
        loading: false,
        submitted: true,
    }
};
const addTeamStart = (state, action) => {
    return{
        ...state,
        loading: true,
        submitted: false,
    }
}
const addTeamFail= (state, action) => {
    return{
        ...state,
        loading: false,
        submitted: false,
    }
}

const getTeamSuccess = (state, action) => {
    return{
        ...state,
        selectedTeam: action.selectedTeam,
        loading:false,
    }
}
const getTeamStart = (state, action) => {
    return{
        ...state,
        loading: true,
    }
}
const getTeamFail= (state, action) => {
    return{
        ...state,
        loading: false,
        submitted: false,
        error: action.error,
    }
}

const setSelectedTeam= (state, action) => {
    return{
        ...state,
        selectedTeam:action.selectedTeam,
    }
}

const addPlayerToTeamSuccess = (state, action) => {
    return{
        ...state,
        loading:false,
    }
}

const addPlayerToTeamFail = (state, action) => {
    return{
        ...state,
        loading:false,
    }
}

const addPlayerToTeamStart = (state, action) => {
    return{
        ...state,
        loading:true,
    }
}

const getTeamsStart = (state, action) => {
    return{
        ...state,
        loading:true,
    }
}

const getTeamsfail = (state, action) => {
    return{
        ...state,
        loading:false,
    }
}

const getTeamsSuccess = (state, action) => {
    return{
        ...state,
        loading:false,
        teams:action.teams,
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_TEAM:return addTeam(state,action);
        case actionTypes.ADD_TEAM_SUCCESS:return addTeamSuccess(state,action);
        case actionTypes.ADD_TEAM_START:return addTeamStart(state,action);
        case actionTypes.ADD_TEAM_FAIL: return addTeamFail(state,action);

        case actionTypes.GET_TEAM_START: return getTeamStart(state, action);
        case actionTypes.GET_TEAM_SUCCESS: return getTeamSuccess(state, action);
        case actionTypes.GET_TEAM_FAIL: return getTeamFail(state, action);
        case actionTypes.SET_SELECTED_TEAM: return setSelectedTeam(state,action);

        case actionTypes.ADD_PLAYER_TO_TEAM_START: return addPlayerToTeamStart(state,action);
        case actionTypes.ADD_PLAYER_TO_TEAM_SUCCESS: return addPlayerToTeamSuccess(state,action);
        case actionTypes.ADD_PLAYER_TO_TEAM_FAIL: return addPlayerToTeamFail(state,action);

        case actionTypes.GET_ALL_TEAMS_START: return getTeamsStart(state,action);
        case actionTypes.GET_ALL_TEAMS_FAIL: return getTeamsfail(state,action);
        case actionTypes.GET_ALL_TEAMS_SUCCESS: return getTeamsSuccess(state,action);
        default: return state;
}
}

export default reducer;