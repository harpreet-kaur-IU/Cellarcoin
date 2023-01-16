import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCT7h8O1cm7m1Q41uXeBK_zp4hes1HxTM8",
    authDomain: "cellarcoin-57f5a.firebaseapp.com",
    projectId: "cellarcoin-57f5a",
    storageBucket: "cellarcoin-57f5a.appspot.com",
    messagingSenderId: "864742986256",
    appId: "1:864742986256:web:eb7695ec3f9f8459c7f095"
};
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
export default firebase;