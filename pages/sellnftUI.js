import { Fragment } from "react";
import Base from "../layout/Base";
import SellNFT from "../modules/SellNFT";

export default function Home() {
    return (
        <Fragment>  
            <Base>
                <SellNFT></SellNFT>
            </Base>
        </Fragment>
    );
}