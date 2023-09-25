import React from "react"
import About from "./About"
import HeroSection from "./HeroSection"
import Header from "./Header"

const HomePage = ()=>{
    return(
        <div>
            <div><Header/></div>
            <div><HeroSection/></div>
            <div><About/></div>
            
        {/* <div><About/></div> */}
        </div>
    )
}

export default HomePage