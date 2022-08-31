import React from 'react'
import style from './css/Counter.module.css'
const Counter = () => {
  return (
    <div className={` ${style["counter-bg"]}`}>
        <div className={` ${style["counter-wrapper"]}`}>
            <h2 className='font-49 f-600 l-137 text-center'>Cellarcoin in numbers</h2>
            <div className={`d-flex d-flex-row d-align-center d-justify-space-between ${style["couter-row-2"]}`}>
                <div className='col-4'>
                    <h1 className='f-700 font-96 l-137 text-black'>600+</h1>
                    <h2 className='f-600 font-38 l-124 text-dark-gray'>Employees</h2>
                </div>
                <div className='col-4'>
                    <h1 className='f-700 font-96 l-137 text-black'>250+</h1>
                    <h2 className='f-600 font-38 l-124 text-dark-gray'>Brands</h2>
                </div>
                <div className='col-4'>
                    <h1 className='f-700 font-96 l-137 text-black'>$76M+</h1>
                    <h2 className='f-600 font-38 l-124 text-dark-gray'>Trading Volume</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Counter