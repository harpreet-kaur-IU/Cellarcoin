import Filter from "../modules/Filter";
import Footer from "../modules/Footer";
import Newsletter from "../modules/Newsletter";
import WineCard from "../modules/WineCard";

export default function Explore() {
    return (
        <>
            <div className="container mt-144">
                <Filter></Filter>
                <div className="d-grid grid-col-3 gap-3">
                    <WineCard></WineCard>
                    <WineCard></WineCard>
                    <WineCard></WineCard>
                    <WineCard></WineCard>
                    <WineCard></WineCard>
                    <WineCard></WineCard>
                </div>
            </div>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </>
    );
}