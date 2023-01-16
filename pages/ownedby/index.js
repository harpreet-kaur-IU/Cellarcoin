import { Fragment } from "react";
import Base from "../../layout/Base";
import Footer from "../../modules/Footer";
import Newsletter from "../../modules/Newsletter";
import OwnedBy from "../../modules/OwnedBy";

export default function Home() {
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