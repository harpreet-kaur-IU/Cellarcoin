import React, { useState } from 'react'
import style from './css/WineCollection1.module.css'
import Filter from './Filter';
import UserNftCards from './UserNftCards';
import UserTable from './UserTable';
import WineCard from './WineCard';

const WineCollection1 = () => {
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
            <div className='offset-4 col-8'>
                <div className={`d-flex ${style["tabs-wrapper"]}`}>
                    <h3 onClick={handleClick} id="tab1" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab1" ? style["active"] : ""} `}>Collection</h3>
                    <h3 onClick={handleClick} id="tab2" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab2" ? style["active"] : ""} `}>Favorited</h3>
                    <h3 onClick={handleClick} id="tab3" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab3" ? style["active"] : ""} `}>Activity</h3>
                </div>
                <div>
                    <Filter></Filter>
                    {activeTab == "tab1" &&
                        <div className='d-grid grid-col-2 gap-3'>
                            <WineCard></WineCard>
                            <WineCard></WineCard>
                            <WineCard></WineCard>
                            <WineCard></WineCard>
                        </div>
                    }
                    {activeTab == "tab2" &&
                        <div className='d-grid grid-col-2 gap-3'>
                            <WineCard></WineCard>
                            <WineCard></WineCard>
                        </div>
                    }
                    {activeTab == "tab3" &&
                        <>
                            <UserNftCards></UserNftCards>
                            <UserTable></UserTable>
                        </>
                    }
                </div>
            </div>
        </div>
        {/* <div className={`col-4 d-flex d-flex-column  d-justify-center ${style["img-content-wrapper"]}`}>
            <h3 className='text-center f-700 l-137'>Unnamed</h3>
            <div className={`mt-16 d-flex d-align-center d-justify-center ${style["eth-wrapper"]}`}>
                <img src='images/eth.png'></img>
                <h5 className='font-24 l-137 f-500'>abcddf.....4512df</h5>
            </div>
            <h5 className='mt-24 text-center l-137 f-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis pretium dui, commodo sed id nunc vel pharetra.</h5>
        </div> */}
    </>
  )
}

export default WineCollection1