
import { Fragment,useEffect } from "react";
import BaseAdmin from "../layout/BaseAdmin";
import Vendor from "../modules/Admin Panel/Vendor";
import {useRouter} from 'next/router'
import { getAdminOnBoardFromCookie } from "../auth/userCookies";
export default function home() {
    const router = useRouter();
    var JWTtoken = getAdminOnBoardFromCookie();
    useEffect(()=>{
        if(!JWTtoken){
            router.push("/adminlogin")
        }
    },[])
    return (
        <Fragment>  
            <BaseAdmin>
                <Vendor></Vendor>
            </BaseAdmin>
        </Fragment>
    );
}