const initialState = {
    team: {},
    NavPanelLink:"",
    ToggleSidePanel: false,
    showFlexItem: false,
    showModal: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "teamSelected":
        return{
            team: action.team,
        }
        case "NavPanelSelection":
        return{
            ...state,
            NavPanelLink:action.navItem,
            showFlexItem: true,
            ToggleSidePanel:!state.ToggleSidePanel,
        }
        case"sidePanelToggle":
        return{
            ...state,
            ToggleSidePanel:!state.ToggleSidePanel,
            showModal: true,
        }
        case "closeModal":
        return{
            ...state,
            showModal:false,
            ToggleSidePanel:false,
            showFlexItem:false,
        }
        case "GetTeam":
        return{
            ...state,
            team:action.team,
        }
        default: return state;
    }
};

export default reducer;
