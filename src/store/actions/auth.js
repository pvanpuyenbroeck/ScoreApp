import * as actionTypes from './actionTypes';
import firebase from '../../firebase-scoreapp';
import axios from '../../axios-scoreapp';
import firebaseNew from 'firebase';

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
        }).catch(error => {
            console.log(error);
        });
    firebaseNew.auth().signOut()
        .then(response => {
            console.log('logged out');
        }).catch(error => {
            console.log(error);
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
                dispatch(authSuccess(user.user));
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

export const googleAuthStart = (path) => {
    return {
        type: actionTypes.GOOGLE_AUTH_START,
    };
};
export const googleAuthSuccess = (path) => {
    return {
        type: actionTypes.GOOGLE_AUTH_SUCCESS,
    };
};
export const googleAuthFail = (error) => {
    return {
        type: actionTypes.GOOGLE_AUTH_FAIL,
        error: error,
    };
};

export const googleAuthenticate = () => {
    const splitFirstAndLastName = (fullName) => {
        const nameArray = fullName.split(" ");
        const name = {
            voornaam: nameArray.shift(),
            familienaam: nameArray.join(' '),
        }
        return name;
    }
    return dispatch => {
        dispatch(googleAuthStart());
        const provider = new firebaseNew.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            //google access token
            const token = result.credential.accessToken;
            console.log(token);
            //signed in user info
            const user = result.user;
            console.log(user);
            dispatch(googleAuthSuccess());
            // dispatch(addUser(user.uid, user.displayName, null, null, user.email));
            firebase.database().ref('/Players/' + user.uid).set({
                userid: user.uid,
                username: user.displayName,
                voornaam: splitFirstAndLastName(user.displayName).voornaam,
                familienaam: splitFirstAndLastName(user.displayName).familienaam,
                email: user.email,
                avatar: user.photoURL,
            }).then(res => {
                console.log(res);
            })
                .catch(err => {
                    console.log(err);
                })

            //...
        }).catch((error) => {
            dispatch(googleAuthFail(error));
            console.log(error);
        })
    }
}

export const addUser = (userid, username, voornaam = 'don', familienaam = 'corleone', email) => {
    // return dispatch => {
    // dispatch();
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
    // }
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

