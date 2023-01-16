import firebase from './firebaseConfig';
export default function useFirebaseAuth(){
    const sendPasswordResetEmail = (email) =>
        firebase.auth().sendPasswordResetEmail(email);

    const signInWithEmailAndPassword = (email, password) =>
        firebase.auth().signInWithEmailAndPassword(email, password);
    
    const createUserWithEmailAndPassword = (email, password) =>
        firebase.auth().createUserWithEmailAndPassword(email,password);
        
    const signOut = () => 
        firebase.auth().signOut();

    return {
        sendPasswordResetEmail,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut
    };
}