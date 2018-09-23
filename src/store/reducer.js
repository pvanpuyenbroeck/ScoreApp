const initialState = {
    team: {},
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "teamSelected":
        return{
            team: action.team,
        }
        default: return state;
    }
};

export default reducer;
