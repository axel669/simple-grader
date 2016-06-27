const config = {
    apiKey: "AIzaSyA795yGTy27WbsdoF78DpX86JM3xp31Ahg",
    databaseURL: "https://simple-grader.firebaseio.com"
};
firebase.initializeApp(config);

export default {
    get db() {
        return firebase.database().ref(`/${firebase.auth().currentUser.uid}`);
    },
    get currentUser() {
        // return firebase.auth().currentUser;
        return new Promise(
            resolve => {
                const changed = token => {
                    firebase.auth().removeAuthTokenListener(changed);
                    resolve(firebase.auth().currentUser);
                };
                firebase.auth().addAuthTokenListener(changed);
            }
        );
    },
    login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    registerEmail(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
};
