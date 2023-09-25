import React from "react"
import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import img from "../1.png"

const About = () =>{
    return(
        <Container>
            <Header>ABOUT US</Header>
            <Wrapper>
            
            <Text>The Hisbah Commission Complaint System is a regulatory mechanism employed in some 
                Muslim-majority regions to uphold Islamic moral and ethical standards within society. 
                This system allows individuals to submit complaints related to behaviors or practices that 
                are perceived as contrary to Islamic principles, such as public decorum, adherence to 
                religious customs, and the prohibition of certain activities. The Hisbah Commission, 
                typically a government or quasi-governmental entity, investigates these complaints, engages with the involved parties, 
                and enforces corrective measures in accordance with Islamic law. However, the implementation and scope of Hisbah Commissions can vary significantly 
                between regions and may be a subject of debate and controversy concerning individual freedoms and human rights.</Text>
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
    backgroundColor:"blue",
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