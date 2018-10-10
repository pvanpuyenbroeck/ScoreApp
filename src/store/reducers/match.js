import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedMatch:{},
}

const setSelectedMatch = (state, action) => {
    return{
        selectedMatch: action.selectedMatch,
    }
} 


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_SELECTED_MATCH:
        return setSelectedMatch(state, action);
        default: return state;
    }

}

export default reducer;