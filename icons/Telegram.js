import style from '../modules/css/Newsletter.module.css'
const Telegram = (props) => {
    const hoverHandler = () =>{
      document.getElementById("path1").style.fill="#077CA9";
      document.getElementById("path2").style.fill="#077CA9";
    }
    const removeHandler = () =>{
      document.getElementById("path1").style.fill="#A0A0A0";
      document.getElementById("path2").style.fill="#A0A0A0";
    }
  return (
    <svg onMouseEnter={hoverHandler} onMouseLeave={removeHandler} className={`${style["telegram-logo"]}`} width={props.width} height={props.height} viewBox="0 0 56 48"  fill={props.color} xmlns="http://www.w3.org/2000/svg">
        <path d="M55.5837 1.70066L46.7966 46.0014C46.7966 46.0014 45.5689 49.0742 42.1882 47.5996L21.9116 32.0548L14.5383 28.4898L2.12718 24.3128C2.12718 24.3128 0.223025 23.6363 0.0386926 22.1616C-0.14564 20.687 2.18801 19.8888 2.18801 19.8888L51.5284 0.533837C51.5284 0.533837 55.5837 -1.24866 55.5837 1.70066Z"/>
        <path id="path1" d="M20.3538 45.5057C20.3538 45.5057 19.7621 45.4486 19.0247 43.1094C18.2874 40.7702 14.5381 28.4844 14.5381 28.4844L44.3392 9.56633C44.3392 9.56633 46.059 8.52116 45.9982 9.56633C45.9982 9.56633 46.306 9.75066 45.3843 10.6097C44.4627 11.4686 21.9741 31.6863 21.9741 31.6863" fill="#A0A0A0"/>
        <path id="path2" d="M29.6873 38.0143L21.6669 45.3268C21.6669 45.3268 21.0402 45.8024 20.3545 45.5111L21.8992 31.9221" fill="#A0A0A0"/>
    </svg>
  )
}

export default Telegram