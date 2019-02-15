import * as actionTypes from '../actions/actionTypes';

const initialState = {
    NavPanelLink:"",
    ToggleSidePanel: false,
    showFlexItem: false,
    showModal: false,
    showFunctionMenu: false,
    // location: 'home',
    breadcrumbLocation:1,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.NAVPANEL_SELECTION:
        return{
            ...state,
            NavPanelLink:action.navItem,
            location: action.navItem,
            showFlexItem: true,
            ToggleSidePanel:false,
            showModal:true,
        }
        case actionTypes.SIDEPANEL_TOGGLE:
        return{
            ...state,
            ToggleSidePanel:!state.ToggleSidePanel,
            showModal: !state.showModal,
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
            NavPanelLink: action.component,
            showModal:true,
            showFunctionMenu: false,
        }
        case actionTypes.SHOW_FUNCTIONMENU:
        return{
            ...state,
            showFunctionMenu:true,
            showModal: true,
        }
        case actionTypes.LOCATION_CHANGE:
        return{
            ...state,
            breadcrumbLocation: action.location,
        }
        default: return state;
    }
};

export default reducer;
