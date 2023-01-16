import { Fragment } from "react";
import BaseUser from "../layout/BaseUser";
import Communities from "../modules/Community";

export default function Home() {
    return (
        <Fragment>  
            <BaseUser>
                <Communities></Communities>
            </BaseUser>
        </Fragment>
    );
}