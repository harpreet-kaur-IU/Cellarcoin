import { Fragment } from "react";
import Footer from "../modules/Footer";
import Base from "../layout/Base";
import WineCollection1 from "../modules/WineCollection1";
import Newsletter from "../modules/Newsletter";

export default function Profile() {
    return (
        <Fragment>  
            <Base>
                <WineCollection1></WineCollection1>
                <Newsletter></Newsletter>
            </Base>
            <Footer></Footer>
        </Fragment>
    );
}