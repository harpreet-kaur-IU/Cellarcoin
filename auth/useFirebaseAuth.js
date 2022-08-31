import { useState, useEffect } from "react";
import firebase from './firebaseConfig';
import { getUserFromCookie, getOnBoardFromCookie, setUserCookie, setOnBoardCookie, removeUserCookie, removeOnBoardCookie } from "./userCookies";

export default function useFirebaseAuth(){
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setMyToken] = useState(null);
    const formatAuthUser = (user) => ({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token: user.multiFactor.user.accessToken,
        phone: user.phoneNumber,
        photo: user.photoURL
    });
    const authStateChanged = async (authState) => {
        if(!authState){ 
            setLoading(false);
            setAuthUser(null);
            setMyToken(null);
            removeUserCookie();
            removeOnBoardCookie();
            return;
        }
        setLoading(true);
        var formattedUser = formatAuthUser(authState);
        setCookiesLog(formattedUser);
        setAuthUser(formattedUser);
        setLoading(false);
    }
    const clear = () => { 
        setAuthUser(null);
        setLoading(true);
        setMyToken(null);
        removeUserCookie();
        removeOnBoardCookie();
    }
    const setCookiesLog = async (data) => {   
        var cookie = getUserFromCookie();
        if(typeof cookie === 'undefined'){
            setUserCookie(data);
        }
        else if(cookie.token == null){
            setUserCookie(data);
            if(getOnBoardFromCookie() == null){
                removeOnBoardCookie();
                // fetchToken(data);
            }
        }
        else{

        }
    }
    // const fetchToken = (data) => {        
    //     var myHeaders = new Headers();
    //     myHeaders.append("Accept", "application/json");
    //     myHeaders.append("Authorization", "Bearer " + data.token);
    //     myHeaders.append("Content-Type", "application/json");
    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };
    //     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/onBoarding`, requestOptions)
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then(response =>{
    //         setMyToken(response.token)
    //         setOnBoardCookie(response.token);
    //     })
    //     .catch(error =>{
    //         console.log('error while onboading'+ error.message);
    //     })
    // }

    const signInWithEmailAndPassword = (email, password) =>
        firebase.auth().signInWithEmailAndPassword(email, password);
    
    const createUserWithEmailAndPassword = (email, password) =>
        firebase.auth().createUserWithEmailAndPassword(email, password);
    
    const signOut = () => 
        firebase.auth().signOut().then(clear);

    // useEffect(() =>{
    //     const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    //     return () => unsubscribe();
    // },[]);


    return {
        authUser,
        loading,
        token,
        formatAuthUser,
        setCookiesLog,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut
    };
}