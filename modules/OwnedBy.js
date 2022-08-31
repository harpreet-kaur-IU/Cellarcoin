import React from 'react'
import style from './css/OwnedBy.module.css'
const OwnedBy = () => {
  return (
    <div className={`bg-common p-relative col-12 ${style["wine-ownedby-section"]}`}>
        <div className='container'>
            <h2 className='f-600 l-137 text-center'>Ondule Collections</h2>
            <div className={`d-flex  ${style["wine-images-row"]}`}>
                <div className={`col-3 p-relative ${style["wine-images-col-1"]}`}>
                    <img className='p-relative' src='images/owned-bg.png'></img>
                    <img className={`p-absolute ${style["wine-image-top"]}`} src="images/owned-img.png"></img>
                </div> 
                <div className={`col-3 p-relative ${style["wine-images-col-2"]}`}>
                    <img className='p-relative' src='images/owned-bg.png'></img>
                    <img className={`p-absolute ${style["wine-image-top"]}`} src="images/owned-img.png"></img>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default OwnedBy