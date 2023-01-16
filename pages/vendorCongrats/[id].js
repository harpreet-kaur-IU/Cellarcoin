import { Fragment } from "react";
import BaseVendor from "../../layout/BaseVendor";
import Congratulation from "../../modules/Vendors Panel/Congratulation"

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <Congratulation></Congratulation>
            </BaseVendor>
        </Fragment>
    );
}