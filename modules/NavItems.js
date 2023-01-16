import {useState,useEffect} from 'react'
import style from './css/NavBar.module.css'
import Router from 'next/router'
import Link from 'next/link'
const NavItems = (props) => {
    const [path, setPath] = useState('');
  
    useEffect(()=>{
      setPath(Router.route)
    },[])
    if(path==props.path){
        if(props.name==="not-transparent"){
            return (
                <>
                    <li className='cursor-pointer ml-32 font-16 f-700 l-124 text-black'>
                        <Link href={props.path}>{props.value}</Link>
                    </li>
                </>
            )
        }else{
            return (
                <>
                    <li className='cursor-pointer ml-32 font-16 f-700 l-124 text-white'>
                        <Link href={props.path}>{props.value}</Link>
                    </li>
                </>
            )
        }
    }else{
        return (
        <>
            <li className='cursor-pointer ml-32 font-16 f-500 l-137'>
                <Link href={props.path}>{props.value}</Link>
            </li>
        </>
        )
    }
}

export default NavItems