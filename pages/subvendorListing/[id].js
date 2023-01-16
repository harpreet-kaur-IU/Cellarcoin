import React, { Fragment } from 'react'
import BaseSubVendor from '../../layout/BaseSubVendor'
import Listing from '../../modules/Sub Vendor Panel/Listing'
const index = () => {
  return (
    <Fragment>
        <BaseSubVendor>
            <Listing></Listing>
        </BaseSubVendor>
    </Fragment>
  )
}

export default index