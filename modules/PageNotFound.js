import React from 'react'
import style from './css/PageNotFound.module.css'
const PageNotFound = () => {
  return (
    <div className={`text-white bg-primary text-center ${style["pagenotfound-section"]}`}>
        <img src='images/404.png'></img>
        <div className='d-flex d-flex-row d-justify-center d-align-center mt-60 '>
            <div className={`${style["page-col-1"]}`}>
                <h2 className='f-400 l-49'>Don’t Worry</h2>
                <button className={`btn-secondary mt-32 font-20 f-500 l-137 ${style["back-home-btn"]}`}>Back to Home</button>
            </div>
            <div className={`${style["vertical-line"]}`}></div>
            <div className={`col-4 ${style["page-col-2"]}`}>
                <h3 className='f-600 l-39'>It’s just a 404 error :(</h3>
                <h3 className='mt-32 f-400 l-39'>Are you lost somewhere? No worries return to homepage to find the correct one.</h3>
            </div>
        </div>
        <div className='p-relative'>
            <img className="col-12 p-relative" src="images/Vector 4.png"></img>
            <img className={`col-12 p-absolute ${style["page-vector-3"]}`} src='images/Vector 3.png'></img>
        </div>
    </div>
  )
}

export default PageNotFound