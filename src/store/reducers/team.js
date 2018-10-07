
import * as actionTypes from '../actions/actionTypes';
const initialState = {
    loading: false,
    submitted: false,
    error: "",
    selectedTeam:{},
    sidePanelOpen: false,
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
    }
}

const setSelectedTeam= (state, action) => {
    return{
        ...state,
        selectedTeam:action.selectedTeam,
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
        default: return state;
}
}

export default reducer;