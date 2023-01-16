import NavBar from "../modules/NavBar"
import Header from "../modules/Vendors Panel/Header"

const Base = (props) => {
  return (
    <div className="d-flex">
        <NavBar></NavBar>
        <main className="bg-very-light-orange col-12 pl-40 pr-40">
          {props.children}
        </main>
    </div>

  )
}

export default Base