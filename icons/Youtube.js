import React from 'react'

const Youtube = () => {
    const hoverHandler = () =>{
        document.getElementById("path4").style.fill="#FF1919";
        document.getElementById("path5").style.fill="#1C1C1C";
        document.getElementById("path6").style.fill="#1C1C1C";
      }
      const removeHandler = () =>{
        document.getElementById("path4").style.fill="white";
        document.getElementById("path5").style.fill="#780543";
        document.getElementById("path6").style.fill="#1C1C1C";
      }
  return (
    <svg onMouseEnter={hoverHandler} onMouseLeave={removeHandler} width="67" height="48" viewBox="0 0 67 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id='path4' d="M63.6426 9.63674C62.459 4.91433 60.2484 3.09428 56.1717 2.43675C53.8203 2.09088 42.5383 1.64771 33.5854 1.64771H33.6248C24.6718 1.64771 13.3899 2.09088 11.0385 2.43675C6.9618 3.09428 4.74722 4.91433 3.5676 9.63674C3.17308 11.2253 2.62207 19.9272 2.62207 23.2477V23.971C2.62207 27.2915 3.17045 35.9933 3.5676 37.5819C4.75117 42.3043 6.9618 44.1244 11.0385 44.7819C13.3899 45.1265 24.6718 45.571 33.6248 45.571H33.5919C42.5449 45.571 53.8269 45.1278 56.1782 44.7819C60.2549 44.1244 62.4695 42.3043 63.6491 37.5819C64.0437 35.9933 64.5947 27.2915 64.5947 23.971V23.2438C64.5881 19.9232 64.0397 11.2214 63.6426 9.63674Z" fill="white"/>
        <path id='path5' d="M27.1709 14.7063L43.6303 23.299L27.1709 32.3072V14.7063Z" fill="#780543"/>
        <path id='path6' d="M27.1709 14.7063L43.6303 23.299L41.7445 24.33L27.1709 14.7063Z" fill="#1C1C1C"/>
    </svg>

  )
}

export default Youtube