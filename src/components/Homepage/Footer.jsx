import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import React from "react"

const Footer = ()=>{
    return(
        <Container>
            <Wrapper>
                COPYRIGHT DEVELOPED. ALL RIGHTS RESERVED
            </Wrapper>
        </Container>
    )
}

export default Footer

const Container = styled(Box)({
    height:"70px",
    width:"100%",
    backgroundColor:"blue",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    // marginTop:"20px",
    color:"white"
})
const Wrapper = styled("div")({
    fontSize:"12px",
    letterSpacing:"2px",
    padding:"10px"
})
// const Container = styled(Box)({})