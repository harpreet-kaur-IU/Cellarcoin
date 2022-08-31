import React from 'react'
import style from './css/WineCollection.module.css'
import ProfileHeader from './ProfileHeader'
const WineCollection = () => {
  return (
    <>
      <div className={`p-relative container ${style["wine-collection-container"]}`}>
        <div className={`${style["wine-collection-bg"]}`}>
        </div>
        <img className='p-absolute' src="images/wine-collection-circle.png"></img>
        <div className='text-center'>
          <h1 className='font-61 f-700 l-137 mt-108'>Penfolds Wine</h1>
          <p className='mt-8 font-25 f-400 l-137 '>Premium wine company</p>
        </div>
      </div>
    </>
   
  )
}

export default WineCollection