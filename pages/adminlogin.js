import { Fragment,useEffect } from "react";
import Login from "../modules/Admin Panel/Login";
import {useRouter} from 'next/router'
import { getAdminOnBoardFromCookie } from "../auth/userCookies";
export default function page() {
    const router = useRouter();
    var JWTtoken = getAdminOnBoardFromCookie();
    useEffect(()=>{
        if(!JWTtoken){
            router.push("/adminlogin")
        }
        else{
            router.push("/admindashboard")
        }
    },[])
    return (
        <Fragment>  
            <Login></Login>
        </Fragment>
    );
}