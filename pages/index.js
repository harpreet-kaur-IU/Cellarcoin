import { Fragment } from "react"
import ComingSoon from "../modules/ComingSoon"
import Newsletter from "../modules/Newsletter"
import Footer from "../modules/Footer"
import HomeTopBrands from "../modules/HomeTopBrands"
import BannerSlider from "../modules/BannerSlider"
import WineCardSlider from "../modules/WineCardSlider"
import Base from "../layout/Base"

export default function Home() {
  return (
    <Fragment>
      <Base>
        <BannerSlider></BannerSlider>
        <WineCardSlider></WineCardSlider>
        <HomeTopBrands></HomeTopBrands>
        <ComingSoon></ComingSoon>
        <Newsletter></Newsletter>
      </Base>
      <Footer></Footer>
    </Fragment>
  )
}
