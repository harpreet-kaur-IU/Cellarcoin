import { Fragment,useEffect } from "react";
import BaseVendor from "../../layout/BaseVendor";
import MultiVendor from "../../modules/Vendors Panel/MultiVendor";
import {useRouter} from 'next/router'
import { getOnBoardFromCookie } from "../../auth/userCookies";
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
                <MultiVendor></MultiVendor>
            </BaseVendor>
        </Fragment>
    );
}