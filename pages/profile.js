import Footer from "../modules/Footer";
import Newsletter from "../modules/Newsletter";
import WineCard from "../modules/WineCard";
import WineCollection from "../modules/WineCollection";


export default function profile() {
    return (
        <>  
           <WineCollection></WineCollection>
           <div className="container mt-40">
                <div className="d-grid grid-col-3 gap-3">
                    <WineCard></WineCard>
                    <WineCard></WineCard>
                    <WineCard></WineCard>
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