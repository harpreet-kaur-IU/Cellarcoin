import { Fragment } from "react";
import Base from "../layout/Base";
import Congrats from "../modules/congrats";

export default function Home() {
    return (
        <Fragment>  
            <Base>
                <Congrats></Congrats>
            </Base>
        </Fragment>
    );
}