import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import style from '.././css/Admin Panel/SideBar.module.css'
import Router from 'next/router'

const MenuItem = (props) => {
    const [path, setPath] = useState('');
    useEffect(()=>{
      setPath(Router.route)
    },[])
    if(path==props.path || (props.multipath=="1" && ((props.haspath1=="1" && path==props.path1) || (props.haspath2=="1" && path==props.path2) || (props.haspath3=="1" && path==props.path3) || (props.haspath4=="1" && path==props.path4)))){
      return (
        <div>
          <li className={`black-4 f-600 font-16 l-23 d-flex d-align-center gap-1 ${style["menu-item-wrapper"]} ${style["active"]}`} >
            <img src="images/Dashboard.png"></img>
            <Link href={props.path}>{props.value}</Link>
          </li>
        </div>
      )
    }
    else{
      return (
        <div>
          <li className={`black-4 f-600 font-16 l-23 d-flex d-align-center gap-1 ${style["menu-item-wrapper"]}`} >
            <img src="images/list.png"></img>
            <Link href={props.path}>{props.value}</Link>
          </li>
        </div>
      )
    }
}

export default MenuItem