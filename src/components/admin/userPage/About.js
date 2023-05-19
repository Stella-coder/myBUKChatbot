import React from "react"
import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import img from "./3.jpg"

const About = () =>{
    return(
        <Container>
            <Header>ABOUT US</Header>
            <Wrapper>
            
            <Text>Bayero University has evolved from a small college running Advanced Level training programmes to one of the respected Nigerian Universities, recognized beyond the shores of the country.

The seed of Bayero University Kano was the Ahmadu Bello College set up in 1960, located within the School for Arabic Studies (SAS), in the old city of Kano. With the establishment of Ahmadu Bello University, Zaria, in 1962, it was renamed Abdullahi Bayero College. In 1964 it moved to a temporary site at the old Kano Airport Hotel, admitting its first set of ten undergraduate students for a B.A. degree programme of Ahmadu Bello University.</Text>
<Image src={img}/>
            </Wrapper>
            
        </Container>
    )
}

export default About

const Container = styled(Box)({
    margin:"20px 0px"
})

const Header = styled("div")({
    fontWeight:"bold",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    fontSize:"25px"
})

const Wrapper = styled(Box)({
    display:"flex",
    flexWrap:"wrap",
    width:"100%",
    justifyContent:"center",
    alignItems:'center',
    "@media screen and (max-width:768px)":{
       
    }
})
const Image = styled("img")({
    width:"500px",
    backgroundColor:"red",
    height:"300px",
    margin:"10px",
    objectFit:"cover",
    borderRadius:"5px",
    "@media screen and (max-width:768px)":{
        width:"290px"
    }
})
const Text = styled("div")({
    width:"500px",
    margin:"10px",
    letterSpacing:"2px",
    lineHeight:1.5,
    "@media screen and (max-width:768px)":{
        width:"290px"
    }
})
// const Container = styled(Box)({})