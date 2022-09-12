import React from 'react'
import NavBarTransparent from '../modules/NavBarTransparent'

const BaseUser = (props) => {
    return (
        <div className="d-flex">
            <NavBarTransparent></NavBarTransparent>
            <main className="col-12">
              {props.children}
            </main>
        </div>
    
      )
}

export default BaseUser