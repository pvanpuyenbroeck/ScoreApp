import * as actionTypes from './actionTypes';

export const navpanelSelection = () => {
    return{
        type: actionTypes.NAVPANEL_SELECTION,
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

export const showComponent = () => {
    return{
        type: actionTypes.SHOW_COMPONENT,
    }
}

export const showFunctionMenu = () => {
    return{
        type: actionTypes.SHOW_FUNCTIONMENU,
    }
}