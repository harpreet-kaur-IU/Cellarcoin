import { Fragment,useEffect } from "react";
import BaseVendor from "../../layout/BaseVendor";
import AllNFT from "../../modules/Vendors Panel/AllNFT";
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
                <AllNFT></AllNFT>
            </BaseVendor>
        </Fragment>
    );
}

