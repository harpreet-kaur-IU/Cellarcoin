import { Fragment } from "react";
import BaseUser from "../layout/BaseUser";
import Brand from "../modules/Brands";
import Footer from "../modules/Footer";
import Newsletter from "../modules/Newsletter";

export default function Home() {
    return (
        <Fragment>  
            <BaseUser>
                <Brand></Brand>
                <Newsletter></Newsletter>
            </BaseUser>
            <Footer></Footer>
        </Fragment>
    );
}