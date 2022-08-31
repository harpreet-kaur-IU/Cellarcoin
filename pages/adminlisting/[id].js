import { Fragment,useEffect } from "react";
import BaseAdmin from "../../layout/BaseAdmin"
import Listing from '../../modules/Admin Panel/Listing'
import {useRouter} from 'next/router'
import { getAdminOnBoardFromCookie } from "../../auth/userCookies";
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
                <Listing></Listing>
            </BaseAdmin>
        </Fragment>
    );
}