import React from 'react'
import style from './css/HomeTopBrands.module.css'
const HomeTopBrands = () => {
  return (
    <div className='mt-48 bg-top-brands'>
        <div className={`container ${style["top-brands-container"]}`}>
            <h2 className='text-center mb-32 text-black f-600 l-137'>Top Brands</h2>
            <div className={`d-grid ${style["top-brands-gallery-wrapper"]}`}>
                <figure className={`p-relative ${style["top-brands-gallery-img-1"]} ${style["top-brands-gallery-hover"]}`}>
                    <img className={`rounded-16 ${style["top-brands-gallery-img"]}`} src='images/b-1.png'></img>
                    <div class={`${style["middle"]}`}>
                        <div class={`${style["text"]}`}>KaiSimone</div>
                    </div>
                </figure>
                <figure className={`p-relative  ${style["top-brands-gallery-img-2"]} ${style["top-brands-gallery-hover"]}`}>
                    <img className={`rounded-16  ${style["top-brands-gallery-img"]}`} src='images/b-2.png'></img>
                    <div class={`${style["middle"]}`}>
                        <div class={`${style["text"]}`}>Loxton</div>
                    </div>
                </figure>
                <figure className={`p-relative  ${style["top-brands-gallery-img-3"]} ${style["top-brands-gallery-hover"]}`}>
                    <img  className={`rounded-16  ${style["top-brands-gallery-img"]}`} src='images/b-4.png'></img>
                    <div class={`${style["middle"]}`}>
                        <div class={`${style["text"]}`}>Capriva</div>
                    </div>
                </figure>
                <figure className={`p-relative  ${style["top-brands-gallery-img-4"]} ${style["top-brands-gallery-hover"]}`}>
                    <img  className={`rounded-16  ${style["top-brands-gallery-img"]}`} src='images/b-3.png'></img>
                    <div class={`${style["middle"]}`}>
                        <div class={`${style["text"]}`}>Ondule</div>
                    </div>
                </figure>
                <figure className={`p-relative  ${style["top-brands-gallery-img-5"]} ${style["top-brands-gallery-hover"]}`}>
                    <img  className={`rounded-16  ${style["top-brands-gallery-img"]}`} src='images/b-5.png'></img>
                    <div class={`${style["middle"]}`}>
                        <div class={`${style["text"]}`}>Castello Monaci</div>
                    </div>
                </figure>
                <figure className={`p-relative  ${style["top-brands-gallery-img-6"]} ${style["top-brands-gallery-hover"]}`}>
                    <img  className={`rounded-16  ${style["top-brands-gallery-img"]}`} src='images/b-6.png'></img>
                    <div class={`${style["middle"]}`}>
                        <div class={`${style["text"]}`}>Eaglehawk</div>
                    </div>
                </figure>
            </div>
        </div>
    </div>
  )
}

export default HomeTopBrands