import { useState } from "react";
import styles from '../css/Vendor Panel/DropDown.module.css'

export default function DropDown(props){

    const [value, setValue] = useState(props.placeholder);
    const handler = (e) => {
        e.currentTarget.classList.toggle(styles["open"]);
    }

    const selectHandler = (e) => {

        setValue(e.currentTarget.getAttribute("value"));
        var value = e.currentTarget.getAttribute("value");
        if(value === "7 days"){
            props.handler("7")
        }else if(value === "20 days"){
            props.handler("20")
        }else{
            props.handler("30")
        }
    }

    return (
        <div className={`f-500 ${styles["drop-down"]}`} onClick={handler} >
            <span> {value} </span>
            {!props.data && <ul>
                <li value="7 days" onClick={selectHandler}>
                    7 days
                </li>
                <li value="20 days" onClick={selectHandler}>
                    20 days
                </li>
                <li value="30 days" onClick={selectHandler}>
                    30 days
                </li>
            </ul>
            }

            {props.data && <ul>
                <li value={props.placeholder} onClick={selectHandler}>
                    {props.placeholder}
                </li>
                {props.data.map((item,index) => { 
                    return (
                        <li value={item.title} onClick={selectHandler} key={index}>
                            {item.title}
                        </li>
                    )
                })}
            </ul>
            }

            <span>
                <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 0.374191C16.2018 0.375484 15.9158 0.493227 15.7031 0.702316L9 7.40544L2.29687 0.702316C2.08553 0.490973 1.79888 0.37224 1.5 0.37224C1.20111 0.37224 0.914468 0.490973 0.703123 0.702316C0.491779 0.913661 0.373047 1.2003 0.373047 1.49919C0.373047 1.79808 0.491779 2.08472 0.703123 2.29607L8.20312 9.79607C8.30764 9.90095 8.43183 9.98416 8.56858 10.0409C8.70532 10.0977 8.85193 10.127 9 10.127C9.14806 10.127 9.29467 10.0977 9.43142 10.0409C9.56816 9.98416 9.69236 9.90095 9.79687 9.79607L17.2969 2.29607C17.4018 2.19155 17.485 2.06736 17.5418 1.93061C17.5985 1.79387 17.6278 1.64726 17.6278 1.49919C17.6278 1.35113 17.5985 1.20452 17.5418 1.06777C17.485 0.931025 17.4018 0.806833 17.2969 0.702316C17.0842 0.493227 16.7982 0.375484 16.5 0.374191Z" fill="#525257"/>
                </svg>
            </span>
        </div>
    )
}

