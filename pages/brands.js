
import { Fragment } from "react";
import Base from "../layout/Base";
import Brand from "../modules/Brands";
import Footer from "../modules/Footer";
import Newsletter from "../modules/Newsletter";

export default function Home() {
    return (
        <Fragment>  
            <Base>
                <Brand banner="images/brands-1.png" logo="images/b-logo-1.png" arrow="images/mouse.png"></Brand>
                <Brand banner="images/brands-2.png" logo="images/b-logo-2.png" arrow="images/mouse.png"></Brand>
                <Brand banner="images/brands-3.png" logo="images/b-logo-3.png" arrow="images/mouse-arrow-up.png"></Brand>
                <Newsletter></Newsletter>
            </Base>
            <Footer></Footer>
        </Fragment>
    );
}