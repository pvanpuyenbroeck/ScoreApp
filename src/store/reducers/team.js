
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
    selectedSeason: "2019-2020",
    makingAdmin: false,
    lastSelectedTeam: {},
    followedTeams: [],
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
        selectedTeam: action.updatedTeam
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
    let updatedTeam = { ...state.selectedTeam };
    updatedTeam[action.selectedSeason].Matches = action.updatedMatches;
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
    return {
        ...state,
        selectedSeason: action.season,
    }
}

const authLogout = (state, action) => {
    return {
        ...initialState
    }
}

const updateAdminStart = (state, action) => {
    return {
        ...state,
        makingAdmin: true,
    }
}

const updateAdminFail = (state, action) => {
    return {
        ...state,
        makingAdmin: false,
    }
}

const updateAdminSuccess = (state, action) => {
    return {
        ...state,
        makingAdmin: false,
        selectedTeam: action.updatedTeam,
    }
}

const setLastSelectedTeamStart = (state, action) => {
    return {
        ...state,
        loading: true,
    }
}

const setLastSelectedTeamFail = (state, action) => {
    return {
        ...state,
        loading: false,
    }
}

const setLastSelectedTeamSuccess = (state, action) => {
    return {
        ...state,
        lastSelectedTeam: action.selectedTeam,
        loading: false,
    }
}

const getLastSelectedTeamStart = (state, action) => {
    return {
        ...state,
        loading: true,
    }
}

const getLastSelectedTeamFail = (state, action) => {
    return {
        ...state,
        loading:false,
    }
}

const getLastSelectedTeamSuccess = (state, action) => {
    return {
        ...state,
        lastSelectedTeam: action.selectedTeam,
        loading:false,
    }
}

const updateSelectedTeam = (state, action) => {
    return{
        ...state,
        selectedTeam: action.team,
    }
}

const addSeasonSuccess = (state, action) => {
    return{
        ...state,
        loading:false,
    }
}

const addSeasonStart = (state, action) => {
    return{
        ...state,
        loading:true,
    }
}

const addSeasonFail = (state, action) => {
    return{
        ...state,
        loading:false,
    }
}

const getFollowedTeamsStart = (state, action) => {
    return{
        ...state,
        followedTeams : [],
    }
}

const getFollowedTeamsFail = (state, action) => {
    return{
        ...state,
        followedTeams: [],
    }
}

const getFollowedTeamsSuccess = (state, action) => {
    return{
        ...state,
        followedTeams: action.followedTeams,
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
        case actionTypes.SET_SEASON: return setSeason(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);

        case actionTypes.UPDATE_PLAYER_ADMIN_START: return updateAdminStart(state, action);
        case actionTypes.UPDATE_PLAYER_ADMIN_FAIL: return updateAdminFail(state, action);
        case actionTypes.UPDATE_PLAYER_ADMIN_SUCCESS: return updateAdminSuccess(state, action);

        case actionTypes.SET_LAST_SELECTED_TEAM_START: return setLastSelectedTeamStart(state, action);
        case actionTypes.SET_LAST_SELECTED_TEAM_FAIL: return setLastSelectedTeamFail(state, action);
        case actionTypes.SET_LAST_SELECTED_TEAM_SUCCESS: return setLastSelectedTeamSuccess(state, action);

        case actionTypes.GET_LAST_SELECTED_TEAM_START: return getLastSelectedTeamStart(state, action);
        case actionTypes.GET_LAST_SELECTED_TEAM_FAIL: return getLastSelectedTeamFail(state, action);
        case actionTypes.GET_LAST_SELECTED_TEAM_SUCCESS: return getLastSelectedTeamSuccess(state, action);

        case actionTypes.UPDATE_SELECTED_TEAM: return updateSelectedTeam(state, action);
        case actionTypes.ADD_SEASON_SUCCESS: return addSeasonSuccess(state,action);
        case actionTypes.ADD_SEASON_START: return addSeasonStart(state,action);
        case actionTypes.ADD_SEASON_FAIL: return addSeasonFail(state,action);

        case actionTypes.GET_FOLLOWEDTEAMS_SUCCESS: return getFollowedTeamsSuccess(state,action);
        case actionTypes.GET_FOLLOWEDTEAMS_START: return getFollowedTeamsStart(state,action);
        case actionTypes.GET_FOLLOWEDTEAMS_FAIL: return getFollowedTeamsFail(state,action);
        default: return state;
    }
}

export default reducer;