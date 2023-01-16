import React from 'react'

const UserCollectionTabs = () => {
  return (
    <div>
        <div className={`d-flex gap-1 d-align-center d-justify-center`}>
            <div className={`home-featured-tab active bg-white border btn-rounded l-20 font-14 f-500 font-xs `}>
                All
            </div>
            <div className={`home-featured-tab border bg-white btn-rounded l-20 font-14 f-500 font-xs `}>
                Top Cities
            </div>
            <div className={`home-featured-tab border bg-white btn-rounded l-20 font-14 f-500 font-xs  `}>
                Top Events
            </div>
            <div className={`home-featured-tab border bg-white btn-rounded l-20 font-14 f-500 font-xs `}>
                My Suggestions
            </div>
        </div>
    </div>
  )
}

export default UserCollectionTabs