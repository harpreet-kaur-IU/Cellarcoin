import React from 'react'
import style from './css/HomeTopBrands.module.css'
const HomeTopBrands = () => {
  return (
    <div className='mt-48 bg-top-brands'>
        <div className={`container ${style["top-brands-container"]}`}>
            <h2 className='text-center mb-32 text-black f-600 l-137'>Top Brands</h2>
            <div className={`d-grid ${style["top-brands-gallery-wrapper"]}`}>
                <figure className={` ${style["top-brands-gallery-img-1"]}`}>
                    <img className={`rounded-16 ${style["top-brands-gallery-img"]}`} src='images/b-1.png'></img>
                </figure>
                <figure className={` ${style["top-brands-gallery-img-2"]}`}>
                    <img className={`rounded-16  ${style["top-brands-gallery-img"]}`} src='images/b-2.png'></img>
                </figure>
                <figure className={` ${style["top-brands-gallery-img-3"]}`}>
                    <img  className={`rounded-16  ${style["top-brands-gallery-img"]}`} src='images/b-4.png'></img>
                </figure>
                <figure className={` ${style["top-brands-gallery-img-4"]}`}>
                    <img  className={`rounded-16  ${style["top-brands-gallery-img"]}`} src='images/b-3.png'></img>
                   
                </figure>
                <figure className={` ${style["top-brands-gallery-img-5"]}`}>
                    <img  className={`rounded-16  ${style["top-brands-gallery-img"]}`} src='images/b-5.png'></img>
                </figure>
                <figure className={` ${style["top-brands-gallery-img-6"]}`}>
                    <img  className={`rounded-16  ${style["top-brands-gallery-img"]}`} src='images/b-6.png'></img>
                </figure>
            </div>
        </div>
    </div>
  )
}

export default HomeTopBrands