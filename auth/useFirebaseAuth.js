import firebase from './firebaseConfig';

export default function useFirebaseAuth(){

    const signInWithEmailAndPassword = (email, password) =>
        firebase.auth().signInWithEmailAndPassword(email, password);
    
    const createUserWithEmailAndPassword = (email, password) =>
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(function(user) {
            console.log(JSON.stringify(user))
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('User did not sign up correctly');
        console.log(errorCode);
        console.console.log(errorMessage);
        });

    
    const signOut = () => 
        firebase.auth().signOut();

    return {
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut
    };
}