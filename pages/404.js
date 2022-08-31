
import { Fragment } from "react";
import Base from "../layout/base";
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