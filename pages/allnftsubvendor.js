import React, { Fragment } from 'react'
import BaseSubVendor from '../layout/BaseSubVendor'
import ListNFT from '../modules/Sub Vendor Panel/listNFT'

const allnftsubvendor = () => {
  return (
    <Fragment>
        <BaseSubVendor>
            <ListNFT></ListNFT>
        </BaseSubVendor>
    </Fragment>
  )
}

export default allnftsubvendor