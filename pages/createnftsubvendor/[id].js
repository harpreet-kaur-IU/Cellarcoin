import React, { Fragment } from 'react'
import BaseSubVendor from '../../layout/BaseSubVendor'
import CreateNft from '../../modules/Sub Vendor Panel/CreateNft'

const index = () => {
  return (
   <Fragment>
        <BaseSubVendor>
            <CreateNft></CreateNft>
        </BaseSubVendor>
   </Fragment>
  )
}

export default index