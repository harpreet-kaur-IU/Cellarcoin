import { Fragment,useEffect} from "react";
import BaseVendor from "../../layout/BaseVendor";
import SellNFT from "../../modules/Vendors Panel/SellNFT";
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
                <SellNFT></SellNFT>
            </BaseVendor>
        </Fragment>
    );
}