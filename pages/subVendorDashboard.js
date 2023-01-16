import React, { Fragment } from 'react'
import BaseSubVendor from '../layout/BaseSubVendor'
import Dashboard from '../modules/Sub Vendor Panel/Dashboard'

const subVendorDashboard = () => {
  return (
    <Fragment>
      <BaseSubVendor>
        <Dashboard></Dashboard>
      </BaseSubVendor>
    </Fragment>
  )
}

export default subVendorDashboard