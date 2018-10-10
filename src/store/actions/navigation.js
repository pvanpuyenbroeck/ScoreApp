import * as actionTypes from './actionTypes';

export const navpanelSelection = (navItem) => {
    console.log(navItem);
    return{
        type: actionTypes.NAVPANEL_SELECTION,
        navItem:navItem,
    }
}

export const sidepanelToggle = () => {
    return{
        type: actionTypes.SIDEPANEL_TOGGLE,
    }
}

export const closeModal = () => {
    return{
        type: actionTypes.CLOSE_MODAL,
    }
}

export const showComponent = (component) => {
    return{
        type: actionTypes.SHOW_COMPONENT,
        component: component,
    }
}

export const showFunctionMenu = () => {
    return{
        type: actionTypes.SHOW_FUNCTIONMENU,
    }
}