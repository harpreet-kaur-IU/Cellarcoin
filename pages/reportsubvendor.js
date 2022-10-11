import React, { Fragment } from 'react'
import BaseSubVendor from '../layout/BaseSubVendor'
import Reports from '../modules/Sub Vendor Panel/Reports'

const reportsubvendor = () => {
  return (
    <Fragment>
        <BaseSubVendor>
            <Reports></Reports>
        </BaseSubVendor>
    </Fragment>
  )
}

export default reportsubvendor