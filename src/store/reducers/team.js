
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: true,
    submitted: false,
    error: "",
    selectedTeam: {},
    sidePanelOpen: false,
    playerDetails: {},
    teams: {},
    removingPlayer: false,
    removingMatch: false,
    seasons: {
        "2018-2019": "2018-2019",
        "2019-2020": "2019-2020",
    },
    selectedSeason: "2018-2019",
}

const addTeam = (state, action) => {
    return {
        ...state,
        loading: false,
        submitted: false,
    }
};

const addTeamSuccess = (state, action) => {
    state.teams.push(action.newTeam);
    return {
        ...state,
        loading: false,
        submitted: true,
    }
};
const addTeamStart = (state, action) => {
    return {
        ...state,
        loading: true,
        submitted: false,
    }
}
const addTeamFail = (state, action) => {
    return {
        ...state,
        loading: false,
        submitted: false,
    }
}

const getTeamSuccess = (state, action) => {
    return {
        ...state,
        selectedTeam: action.selectedTeam,
        loading: false,
    }
}
const getTeamStart = (state, action) => {
    return {
        ...state,
        loading: true,
    }
}
const getTeamFail = (state, action) => {
    return {
        ...state,
        loading: false,
        submitted: false,
        error: action.error,
    }
}

const setSelectedTeam = (state, action) => {
    return {
        ...state,
        selectedTeam: action.selectedTeam,
    }
}

const addPlayerToTeamSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
    }
}

const addPlayerToTeamFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error,
    }
}

const addPlayerToTeamStart = (state, action) => {
    return {
        ...state,
        loading: true,
        selectedTeam: action.updatedTeam,
    }
}

const getTeamsStart = (state, action) => {
    return {
        ...state,
        loading: true,
    }
}

const getTeamsFail = (state, action) => {
    return {
        ...state,
        loading: false,
    }
}

const getTeamsSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        teams: action.teams,
    }
}

const removePlayerStart = (state, action) => {
    return {
        ...state,
        removingPlayer: true,
    }
}

const removePlayerSuccess = (state, action) => {
    return {
        ...state,
        removingPlayer: false,
        selectedTeam: action.updatedTeam,
    }
}

const removePlayerFail = (state, action) => {
    return {
        ...state,
        removingPlayer: false,
        error: action.error,
    }
}

const removeMatchStart = (state, action) => {
    return {
        ...state,
        removingMatch: true,
    }
}


const removeMatchSuccess = (state, action) => {
    let updatedTeam = {...state.selectedTeam};
    updatedTeam.Matches = action.updatedMatches;
    return {
        ...state,
        removingMatch: false,
        selectedTeam: updatedTeam,
    }
}

const removeMatchFail = (state, action) => {
    return {
        ...state,
        removingMatch: false,
        error: action.error,
    }
}

const setSeason = (state, action) => {
    return{
        ...state,
        selectedSeason: action.season,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TEAM: return addTeam(state, action);
        case actionTypes.ADD_TEAM_SUCCESS: return addTeamSuccess(state, action);
        case actionTypes.ADD_TEAM_START: return addTeamStart(state, action);
        case actionTypes.ADD_TEAM_FAIL: return addTeamFail(state, action);

        case actionTypes.GET_TEAM_START: return getTeamStart(state, action);
        case actionTypes.GET_TEAM_SUCCESS: return getTeamSuccess(state, action);
        case actionTypes.GET_TEAM_FAIL: return getTeamFail(state, action);
        case actionTypes.SET_SELECTED_TEAM: return setSelectedTeam(state, action);

        case actionTypes.ADD_PLAYER_TO_TEAM_START: return addPlayerToTeamStart(state, action);
        case actionTypes.ADD_PLAYER_TO_TEAM_SUCCESS: return addPlayerToTeamSuccess(state, action);
        case actionTypes.ADD_PLAYER_TO_TEAM_FAIL: return addPlayerToTeamFail(state, action);

        case actionTypes.GET_ALL_TEAMS_START: return getTeamsStart(state, action);
        case actionTypes.GET_ALL_TEAMS_FAIL: return getTeamsFail(state, action);
        case actionTypes.GET_ALL_TEAMS_SUCCESS: return getTeamsSuccess(state, action);

        case actionTypes.REMOVE_PLAYER_START: return removePlayerStart(state, action);
        case actionTypes.REMOVE_PLAYER_SUCCESS: return removePlayerSuccess(state, action);
        case actionTypes.REMOVE_PLAYER_FAIL: return removePlayerFail(state, action);

        case actionTypes.REMOVE_MATCH_START: return removeMatchStart(state, action);
        case actionTypes.REMOVE_MATCH_SUCCESS: return removeMatchSuccess(state, action);
        case actionTypes.REMOVE_MATCH_FAIL: return removeMatchFail(state, action);
        case actionTypes.SET_SEASON: return setSeason(state,action);
        default: return state;
    }
}

export default reducer;