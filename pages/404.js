
import { Fragment } from "react";
import Base from "../layout/Base";
import PageNotFound from "../modules/PageNotFound";


export default function Home() {
    return (
        <Fragment>  
            <Base>
                <PageNotFound></PageNotFound>
            </Base>
        </Fragment>
    );
}