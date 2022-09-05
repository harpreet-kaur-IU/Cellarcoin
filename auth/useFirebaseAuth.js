import firebase from './firebaseConfig';

export default function useFirebaseAuth(){

    const signInWithEmailAndPassword = (email, password) =>
        firebase.auth().signInWithEmailAndPassword(email, password);
    
    const createUserWithEmailAndPassword = (email, password) =>
        firebase.auth().createUserWithEmailAndPassword(email, password);
    
    const signOut = () => 
        firebase.auth().signOut();

    return {
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut
    };
}