
import { Fragment } from "react";
import Footer from "../modules/Footer";
import Newsletter from "../modules/Newsletter";
import OwnedBy from "../modules/OwnedBy";
import Base from "../layout/Base";

export default function Profile() {
    return (
        <Fragment>  
            <Base>
                <OwnedBy></OwnedBy>
                <Newsletter></Newsletter>
            </Base>
            <Footer></Footer>
        </Fragment>
    );
}