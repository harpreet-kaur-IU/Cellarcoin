import React from 'react'
import styles from './css/WineCard.module.css'

const WineCard = (props) => {
  return (
    <>
        <div className='bg-card-dark rounded-16'>
            <img className={` ${styles["wine-bg-img"]}`} src={props.imageUrl}></img>
            <div className='p-16'>
                <div className='d-flex d-align-center d-justify-space-between text-light-gray mb-16'>
                    <h6 className='l-137 f-500'>Listing Price</h6>
                    <h6 className='l-137 f-500'>Owned by</h6>
                </div>
                <div className={`d-flex d-align-center d-justify-space-between text-dark ${styles["wine-card-content-row-2"]}`}>
                    <h5 className='l-137 f-500'>
                        <img src='images/eth.png'></img>
                        {props.price} {/* wETH($711) */}
                    </h5>
                    <h5 className='l-137 f-500'>@Odule</h5>
                </div>
                <div className='d-flex d-align-center d-justify-space-between text-light-gray mb-16'>
                    <h6 className='f-500'>Brand</h6>
                    <h6 className={`d-flex ${styles["wine-card-content-view"]}`}>
                        <span className='d-flex d-align-center l-137 f-500 bg-white'>
                            <span>{props.views}</span>
                            <img src="images/eye.png"></img>
                        </span>
                        <span className='d-flex d-align-center l-137 f-500 bg-white'>
                            <span>{props.favourites}</span>
                            <img src="images/heart.png"></img>
                        </span>
                    </h6>
                </div>
                <div className='d-flex d-justify-space-between'>
                    <h5 className='l-137 f-500'>PURPLE MALBEC</h5>
                </div>
            </div>
        </div>
    </>
  )
}

export default WineCard