import * as actionTypes from './actionTypes';
import firebase from '../../firebase-scoreapp';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user:user,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    firebase.auth().signOut()
    .then(response => {
        console.log('logged out');
    });
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     };
    //     let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBIHrb20BX4dvFaZJWe9WkUTSeL7hHwE04';
    //     if (!isSignup) {
    //         url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBIHrb20BX4dvFaZJWe9WkUTSeL7hHwE04';
    //     }
    //     axios.post(url, authData)
    //         .then(response => {
    //             console.log(response);
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //             localStorage.setItem('token', response.data.idToken);
    //             localStorage.setItem('expirationDate', expirationDate);
    //             localStorage.setItem('userId', response.data.localId);
    //             dispatch(authSuccess(response.data.idToken, response.data.localId));
    //             dispatch(checkAuthTimeout(response.data.expiresIn));
    //         })
    //         .catch(err => {
    //             dispatch(authFail(err.response.data.error));
    //         });
    // };
};



export const authFirebaseLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(user => {
                console.log(user);
                dispatch(authSuccess(user));
            })
            .catch(err => {
                console.log(err.message);
                dispatch(authFail(err));
            });
            
            firebase.auth().setPersistence('session')
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(email,password);
            }).catch((err) => {
                console.log(err);
            });
    };
}

export const authFirebaseSignup = (email, password, username, voornaam, familienaam) => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(user => {
            dispatch(addUser(user.user.uid,username,voornaam,familienaam));
            dispatch(authSuccess(user));
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    }
}


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

// export const authCheckState = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             dispatch(logout());
//         } else {
//             const expirationDate = new Date(localStorage.getItem('expirationDate'));
//             if (expirationDate <= new Date()) {
//                 dispatch(logout());
//             } else {
//                 const userId = localStorage.getItem('userId');
//                 dispatch(authSuccess(token, userId));
//                 dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
//             }   
//         }
//     };
// };

export const addUser = (userid, username, voornaam, familienaam) => {
    return dispatch => {
        firebase.database().ref('/Players/' + userid).set({
            userid:userid,
            username: username,
            voornaam:voornaam,
            familienaam: familienaam})
        }
    }