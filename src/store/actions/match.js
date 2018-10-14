import * as actionTypes from './actionTypes';


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

