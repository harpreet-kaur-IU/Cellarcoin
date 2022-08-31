import { Fragment, useEffect } from "react";
import BaseVendor from ".././layout/BaseVendor";
import Reports from "../modules/Vendors Panel/Reports";
import {useRouter} from 'next/router'
import { getOnBoardFromCookie } from "../auth/userCookies";
export default function home() {
    const router = useRouter();
    var JWTtoken = getOnBoardFromCookie();
    useEffect(()=>{
        if(!JWTtoken){
            router.push("/vendorlogin")
        }
    },[])
    return (
        <Fragment>  
            <BaseVendor>
                <Reports></Reports>
            </BaseVendor>
        </Fragment>
    );
}