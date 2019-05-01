import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
// import { googleAuthFail } from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    uid:null,
    user: null,
    googleAuthenticated:false,
    googleAuthError: null,
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        user: action.user,
        authRedirectPath:'/',
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        authRedirectPath:'/auth',
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { 
        token: null, 
        userId: null, 
        user:null,
        isAuthenticated:false,
        authRedirectPath: '/auth',
    });
};

const googleAuthStart = (state, action) => {
    return updateObject(state, { 
        googleAuthenticated: false,
    });
};
const googleAuthSuccess = (state, action) => {
    return updateObject(state, { 
        googleAuthenticated: true,
    });
};
const googleAuthFail = (state, action) => {
    return updateObject(state, { 
        googleAuthenticated: false,
        googleAuthError: action.error,
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        case actionTypes.GOOGLE_AUTH_START: return googleAuthStart(state,action);
        case actionTypes.GOOGLE_AUTH_SUCCESS: return googleAuthSuccess(state,action);
        case actionTypes.GOOGLE_AUTH_FAIL: return googleAuthFail(state,action);
        default: return state;
    }
};

export default reducer;