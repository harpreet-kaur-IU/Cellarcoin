import React from 'react'
import style from './css/WineCollection.module.css'
const WineCollection = () => {
  return (
    <>
      <div className={`container ${style["wine-collection-container"]}`}>
          <div className={`d-flex d-align-center d-justify-center ${style["wine-collection-bg"]}`}>
            <img src="images/wine-collection-circle.png"></img>
          </div>
         
        <div className='text-center'>
          <h1 className='font-61 f-700 l-137 mt-108'>Penfolds Wine</h1>
          <p className='mt-8 font-25 f-400 l-137 '>Premium wine company</p>
        </div>
      </div>
    </>
   
  )
}

export default WineCollection