import React from 'react'
import style from './css/Brands.module.css'
const Brands = (props) => {
  return (
    <div style={{backgroundImage: `url(${props.banner})`}} className={`${style["brands-bg"]}`}>
        <div className={`text-white d-flex d-flex-column d-align-center d-justify-center ${style["brands-banner-padding"]}`}>
          <img src={props.logo}></img>
          <h3 className='col-8 mt-32 f-700 l-137'>The wines produced at Chateau Lafite Rothschild have all the classic characteristics of a red Bordeaux! Each bottle has intense flavors of blackcurrants and aromas.</h3>
          <img className='mt-40' src="images/mouse.png"></img>
        </div>
    </div>
  )
}

export default Brands