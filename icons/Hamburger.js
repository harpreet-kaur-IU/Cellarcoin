const Hamburger = (props) => {
  return (
    <>
        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="3" rx="1.5" fill={props.color}/>
            <rect y="6" width="18" height="3" rx="1.5" fill={props.color}/>
            <rect y="12" width="18" height="3" rx="1.5" fill={props.color}/>
        </svg>
    </>
  )
}

export default Hamburger
