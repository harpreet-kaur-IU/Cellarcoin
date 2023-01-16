import { Fragment } from "react";
import BaseUser from "../layout/BaseUser";
import AboutBanner from "../modules/AboutBanner";
import Accordian from "../modules/Accordian";
import Counter from "../modules/Counter";
import Footer from "../modules/Footer";
import JoinCommunityBanner from "../modules/JoinCommunityBanner";
import Newsletter from "../modules/Newsletter";
import OurPillars from "../modules/OurPillars";


export default function Home() {
    return (
        <Fragment>  
            <BaseUser>
                <AboutBanner></AboutBanner>
                <Counter></Counter>
                <OurPillars></OurPillars>
                <JoinCommunityBanner></JoinCommunityBanner>
                <Accordian></Accordian>
                <Newsletter></Newsletter>
            </BaseUser>
            <Footer></Footer>
        </Fragment>
    );
}