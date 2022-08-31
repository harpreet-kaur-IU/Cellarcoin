import { Fragment } from "react";
import Base from "../layout/Base";
import Communities from "../modules/Community";

export default function Home() {
    return (
        <Fragment>  
            <Base>
                <Communities></Communities>
            </Base>
        </Fragment>
    );
}