import React,{useState} from 'react'
import style from './css/FAQAccordian.module.css'
const FAQAccordian = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false);
  
    return ( 
        <div>
            <div className={`d-flex d-flex-row d-justify-space-between mb-32 ${style["faq-accordian-item-wrapper"]}`} onClick={() => setIsActive(!isActive)}>
                <h3 className='d-inline font-31 f-400 l-137'>{title}</h3>
                <img src={isActive?'images/arrow-up.png':'images/arrow-down.png'}></img>
            </div>
            {isActive && <div className={`${style["accordian-content-wrapper"]}`}>
                <h3 className='font-24 f-500 l-33 '>{content}</h3>    
            </div>}
        </div>
    );
  };

export default FAQAccordian