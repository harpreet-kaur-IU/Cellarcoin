import {useState} from 'react'
import style from './css/WineCollection1.module.css'
import Filter from './Filter';
import NFTCard from './NFTCard';
import UserNftCards from './UserNftCards';
import UserTable from './UserTable';
import WineCard from './WineCard';
const UserNft = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const handleClick = (e) => {
        setActiveTab(e.target.id);
    };
  return (
    <>
        <div className={`container ${style["wine-collection-container"]}`}>
            <div className={`d-flex d-flex-column d-justify-start ${style["wine-collection-bg"]}`}>
                <div className={`${style["wine-collection-circle-img"]}`}>
                    <img src="images/wine-collection-circle.png"></img>
                </div>
            </div>
            <div className={`d-flex col-12 ${style["user-details"]}`}>
                <div className={`col-3 d-flex d-flex-column d-align-center gap-2 ${style["user-details-col-3"]}`}>
                    <div className={`d-flex d-flex-column gap-2 ${style["user-name-wallet-address"]}`}>
                        <h3 className={`text-center cursor-pointer f-700 l-137`}>User Name User Name</h3>
                        <div className={`d-flex d-align-center gap-1`}>
                            <img src='images/eth-sm.png'></img>
                            <h5 className='font-16 f-400 l-137 word-break'>0x8B5db879e1E2207DdA833aF136edD224aDf4DA19</h5>
                        </div>
                    </div>
                    {/* <h5 className='text-center f-400 l-137'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis pretium dui, commodo sed id nunc vel pharetra.
                    </h5> */}
                </div>
                <div className={`offset-1 col-8 ${style["wine-tabs-col"]}`}>
                    <div className={`d-flex ${style["tabs-wrapper"]}`}>
                        <h3 onClick={handleClick} id="tab1" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab1" ? style["active"] : ""} `}>Collection</h3>
                        <h3 onClick={handleClick} id="tab2" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab2" ? style["active"] : ""} `}>On Sale</h3>
                        <h3 onClick={handleClick} id="tab3" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab3" ? style["active"] : ""} `}>Favourites</h3>
                        <h3 onClick={handleClick} id="tab4" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab4" ? style["active"] : ""} `}>Activity</h3>
                    </div>
                </div>
            </div>
            <>
                <Filter></Filter>
                {activeTab == "tab1" &&
                    <div className={`offset-4 col-8 d-grid grid-col-2 gap-3 ${style["wine-tab-1"]}`}>
                       <NFTCard status="Sell NFT"></NFTCard>
                       <NFTCard status="Sell NFT"></NFTCard>
                    </div>
                }
                {activeTab == "tab2" &&
                    <div className={`offset-4 col-8 d-grid grid-col-2 gap-3 ${style["wine-tab-2"]}`}>
                       <WineCard></WineCard>
                       <WineCard></WineCard>
                       <WineCard></WineCard>
                       <WineCard></WineCard>
                    </div>
                }
                {activeTab == "tab3" &&
                    <div className={`offset-4 col-8 d-grid grid-col-2 gap-3 ${style["wine-tab-2"]}`}>
                        <WineCard></WineCard>
                       <WineCard></WineCard>
                       <WineCard></WineCard>
                       <WineCard></WineCard>
                    </div>
                }
                {activeTab == "tab4" &&
                     <>
                     <div className={`offset-4 col-8 ${style["wine-tab-3"]}`}>
                         <UserNftCards></UserNftCards>
                     </div>
                     <UserTable></UserTable>
                 </>
                }
            </>
        </div>
    </>
  )
}

export default UserNft