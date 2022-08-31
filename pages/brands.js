
import { Fragment } from "react";
import Base from "../layout/base";
import Brands from "../modules/Brands";
import Footer from "../modules/Footer";
import Newsletter from "../modules/Newsletter";


export default function brands() {
    return (
        <Fragment>  
            <Base>
                <Brands banner="images/brands-1.png" logo="images/b-logo-1.png"></Brands>
                <Brands banner="images/brands-2.png" logo="images/b-logo-2.png"></Brands>
                <Brands banner="images/brands-3.png" logo="images/b-logo-3.png"></Brands>
                <Newsletter></Newsletter>
            </Base>
            <Footer></Footer>
        </Fragment>
    );
}