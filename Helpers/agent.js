import React from 'react';
import firebase from 'react-native-firebase';

const authService = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

const Auth = {
    current: () => {
        return new Promise(function (resolve, reject) {
            authService.onAuthStateChanged(function (user) {
                if (user) {
                    resolve(user);
                } else {

                }
            })
        })
    },
    login: (email, password) => {

        return dispatch => {
            authService.signInWithEmailAndPassword(email, password)
                .then((user) => {
                    // Success
                    console.log('success');
                    console.log(user)
                    console.log(user.additionalUserInfo.isNewUser)

                })
                .catch((error) => {
                    console.log('error');
                    console.log('Do I still access ' + email + password);
                    return authService.createUserWithEmailAndPassword(email, password)
                })
                .then((user) => {
                    console.log(user);

                }).catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
        };

    },
    register: (email, password) => {
        return authService.createUserWithEmailAndPassword(email, password);
    },
    logout: () => {
        authService.signOut();
    }
};


const FirebaseWatcher = {
    links: (id) => {
        return dispatch => {
            var linkWatcher = database.ref('api/v1/responses/' + id);
            linkWatcher.on('value', function (snapshot) {

                if (snapshot.val()) {
                }
                dispatch({type: 'LINK', link: 'https://gifty.link/' + id});
            });
            linkWatcher.off();
        }
    },
}

const FirebaseQuery = {
    fetchQuote: () => {
        return dispatch => {
            console.log('FETCH_QUOTE');
            database.ref('quotes/uid1').once('value', (snapshot) => {

                console.log(snapshot.val());
                console.log('inside snaphsot');
                dispatch({
                    type: 'QUOTE_UPDATE',
                    quoteMeta: snapshot.val()
                })

                return (snapshot.val());
            });

        }
    },
};


export default {
    Auth,
    FirebaseQuery,
    FirebaseWatcher,
};
