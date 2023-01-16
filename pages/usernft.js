import { Fragment } from "react";
import Footer from "../modules/Footer";
import Base from "../layout/Base";
import UserNft from "../modules/UserNft";
import Newsletter from "../modules/Newsletter";

export default function Home() {
    return (
        <Fragment>  
            <Base>
                <UserNft></UserNft>
                <Newsletter></Newsletter>
            </Base>
            <Footer></Footer>
        </Fragment>
    );
}