import React from 'react'
import style from './css/NftTable.module.css'
const NftTable = () => {
  return (
    <table className='container'>
        <tr className={`d-flex d-flex-row text-center font-20 l-137 ${style["table-heading"]}`}>
            <th className='text-left col-3 f-500 '>Item</th>
            <th className='col-2 f-500 '>Price</th>
            <th className='col-1 f-500 '>Quantity</th>
            <th className='col-2 f-500 '>To</th>
            <th className='col-2 f-500 '>From</th>
            <th className='col-2 f-500 '>Time</th>
        </tr>
        <tr className={`d-flex d-flex-row text-center font-18 ${style["table-content"]}`}>
            <td className='col-3 d-flex d-flex-row text-left gap-2 '>
                <img src="images/wine.png"></img>
                <span className='font-18 f-500 l-137 text-black mt-25' >PURPLE MALBEC</span>
            </td>
            <td className='col-2 gap-1 mt-25'>
                <img src='images/eth-sm.png'></img>
                <span className='f-500 l-137 text-black'>2.96</span>
            </td>
            <td className='col-1 mt-25 f-500'>1</td>
            <td className='col-2 mt-25 f-500 text-primary'>dezzdsde</td>
            <td className='col-2 mt-25 f-500 text-primary'>adsfe112</td>
            <td className='col-2 mt-25 f-500 text-primary'>36 Mins Ago</td>
        </tr>
    </table>
  )
}

export default NftTable