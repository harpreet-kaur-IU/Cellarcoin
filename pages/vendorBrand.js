import { Fragment } from "react";
import BaseVendor from ".././layout/BaseVendor";
import Brands from "../modules/Vendors Panel/Brands";

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <Brands></Brands>
            </BaseVendor>
        </Fragment>
    );
}