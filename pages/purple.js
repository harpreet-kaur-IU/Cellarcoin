import BackgroundImageBanner from "../modules/BackgroundImageBanner";
import Footer from "../modules/Footer";
import MarketPlaceBanner from "../modules/MarketPlaceBanner";
import Newsletter from "../modules/Newsletter";
import WineCard from "../modules/WineCard";

export default function Purple() {
    return (
        <>  
            <MarketPlaceBanner></MarketPlaceBanner>
            <div className="container">
                <div className="d-grid grid-col-3 gap-3">
                    <WineCard></WineCard>
                    <WineCard></WineCard>
                    <WineCard></WineCard>
                </div>
            </div>
            <BackgroundImageBanner></BackgroundImageBanner>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </>
    );
}