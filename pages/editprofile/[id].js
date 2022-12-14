import { Fragment } from "react";
import Base from "../../layout/Base";
import Footer from "../../modules/Footer";
import MyAccount from "../../modules/MyAccount";

export default function Home() {
    return (
        <Fragment>
            <Base>
                <MyAccount></MyAccount>
            </Base>
            <Footer></Footer>
        </Fragment>
    );
}