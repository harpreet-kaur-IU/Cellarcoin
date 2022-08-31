import { Fragment,useEffect } from "react";
import Notification from "../modules/Admin Panel/Notification";
import {useRouter} from 'next/router'
import { getAdminOnBoardFromCookie } from "../auth/userCookies";
export default function Home() {
    const router = useRouter();
    var JWTtoken = getAdminOnBoardFromCookie();
    useEffect(()=>{
        if(!JWTtoken){
            router.push("/adminlogin")
        }
        else{
            router.push("/adminnotification")
        }
    },[])
    return (
        <Fragment>  
            <Notification></Notification>
        </Fragment>
    );
}