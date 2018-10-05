import * as actionTypes from '../actions/actionTypes';

const initialState = {
    NavPanelLink:"",
    ToggleSidePanel: false,
    showFlexItem: false,
    showModal: false,
    showFunctionMenu: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.NAVPANEL_SELECTION:
        return{
            ...state,
            NavPanelLink:action.navItem,
            showFlexItem: true,
            ToggleSidePanel:!state.ToggleSidePanel,
            showModal:true,
        }
        case actionTypes.SIDEPANEL_TOGGLE:
        return{
            ...state,
            ToggleSidePanel:!state.ToggleSidePanel,
            showModal: true,
        }
        case actionTypes.CLOSE_MODAL:
        return{
            ...state,
            showModal:false,
            ToggleSidePanel:false,
            showFlexItem:false,
            showFunctionMenu: false,
        }
        case actionTypes.SHOW_COMPONENT:
        return{
            ...state,
            showFlexItem: true,
            NavPanelLink: action.navItem,
            showModal:true,
            showFunctionMenu: false,
        }
        case actionTypes.SHOW_FUNCTIONMENU:
        return{
            ...state,
            showFunctionMenu:true,
            showModal: true,
        }
        default: return state;
    }
};

export default reducer;
