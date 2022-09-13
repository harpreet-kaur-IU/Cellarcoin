import style from '../modules/css/NavBar.module.css'
import Router from 'next/router'
import { useEffect, useState } from 'react';
const ProfileIcon = (props) => {
    const [path, setPath] = useState('');
  
    useEffect(()=>{
      setPath(Router.route)
    },[])
    
    if(path=='/editprofile/[id]'){
        return (
            <svg className={`${style["profile-icon-svg"]}`} width="18" height="24" viewBox="0 0 18 24" fill={props.color} xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12C12.3137 12 15 9.31371 15 6C15 2.68629 12.3137 0 9 0C5.68629 0 3 2.68629 3 6C3 9.31371 5.68629 12 9 12Z" />
                <path d="M9 13.999C4.03172 14.0046 0.00553125 18.0307 0 22.999C0 23.5513 0.447703 23.999 0.999984 23.999H17C17.5522 23.999 18 23.5513 18 22.999C17.9945 18.0307 13.9683 14.0045 9 13.999Z" />
            </svg>
        )
    }else{
        return (
            <svg width="18" height="24" viewBox="0 0 18 24" fill={props.color} xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12C12.3137 12 15 9.31371 15 6C15 2.68629 12.3137 0 9 0C5.68629 0 3 2.68629 3 6C3 9.31371 5.68629 12 9 12Z" />
                <path d="M9 13.999C4.03172 14.0046 0.00553125 18.0307 0 22.999C0 23.5513 0.447703 23.999 0.999984 23.999H17C17.5522 23.999 18 23.5513 18 22.999C17.9945 18.0307 13.9683 14.0045 9 13.999Z" />
            </svg>
        )
    }
}

export default ProfileIcon