import React, { Fragment } from 'react'
import BaseSubVendor from '../layout/BaseSubVendor'
import Notification from '../modules/Sub Vendor Panel/Notification'

const subvendornotification = () => {
  return (
    <Fragment>
        <BaseSubVendor>
            <Notification></Notification>
        </BaseSubVendor>
    </Fragment>
  )
}

export default subvendornotification