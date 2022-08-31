import { Fragment,useEffect } from "react";
import Notification from "../modules/Admin Panel/Notification";
import {useRouter} from 'next/router'
import { getAdminOnBoardFromCookie } from "../auth/userCookies";
import BaseAdmin from "../layout/BaseAdmin";
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
            <BaseAdmin>
                <Notification></Notification>
            </BaseAdmin>
        </Fragment>
    );
}