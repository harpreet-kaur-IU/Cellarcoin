import { Fragment,useEffect } from "react";
import BaseVendor from "../../layout/BaseVendor";
import Listing from '../../modules/Vendors Panel/Listing'
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
                <Listing></Listing>
            </BaseVendor>
        </Fragment>
    );
}