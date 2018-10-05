const initialState = {
    team: {},
    NavPanelLink:"",
    ToggleSidePanel: false,
    showFlexItem: false,
    showModal: false,
    showFunctionMenu: false,
    selectedTeam:{},
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
            showModal:true,
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
            showFunctionMenu: false,
        }
        case "GetTeam":
        return{
            ...state,
            team:action.team,
        }
        case "showComponent":
        return{
            ...state,
            showFlexItem: true,
            NavPanelLink: action.navItem,
            showModal:true,
            showFunctionMenu: false,
        }
        case "showFunctionMenu":
        return{
            ...state,
            showFunctionMenu:true,
            showModal: true,
        }
        case "selectedTeam":
        return{
            ...state,
            selectedTeam: action.selectedTeam,
        }
        case "addTeam":
        return{
            ...state,
            //Nog af te werken
        }
        default: return state;
    }
};

export default reducer;
