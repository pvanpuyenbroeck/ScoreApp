import * as actionTypes from './actionTypes';
import firebase from '../../firebase-scoreapp';
import axios from '../../axios-scoreapp';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user,
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

export const fileUpload = (newPlayerId, file) => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    fd.append('idFromUser', this.state.newPlayerId);
    axios.post('https://us-central1-score-app-b69dc.cloudfunctions.net/uploadFile', fd, {
        onUploadProgress: ProgressEvent => {
            console.log('Upload progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%');
        }
    })
        .then(res => {
            console.log(res);
        })
}


export const authFirebaseLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().signInWithEmailAndPassword(email, password)
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
                return firebase.auth().signInWithEmailAndPassword(email, password);
            }).catch((err) => {
                console.log(err);
            });
    };
}

export const authFirebaseSignup = (email, password, username, voornaam, familienaam) => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                dispatch(addUser(user.user.uid, username, voornaam, familienaam, user.user.email));
                user.user.updateProfile({
                    displayName: username,
                    firstName: voornaam,
                    lastName: familienaam,
                }).then(response => {
                    console.log(response);
                })
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

export const addUser = (userid, username, voornaam = 'don', familienaam = 'corleone', email) => {
    return dispatch => {
        firebase.database().ref('/Players/' + userid).set({
            userid: userid,
            username: username,
            voornaam: voornaam,
            familienaam: familienaam,
            email: email,
        }).then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const fileUploadHandler = (selectedFile, PlayerId) => {
    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    fd.append('idFromUser', PlayerId);
    axios.post('https://us-central1-score-app-b69dc.cloudfunctions.net/uploadFile', fd, {
        onUploadProgress: ProgressEvent => {
            console.log('Upload progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%');
        }
    })
        .then(res => {
            console.log(res);
        })
}

