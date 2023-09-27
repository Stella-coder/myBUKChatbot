import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import {styled} from "@mui/styles"

const HeroSection = () =>{
    
    return(
        <MyBox>
          <BdgImg>
            <Modal>
            <Text component="h1">Welcome to, Hisbah Commission Complain System (HCCS).</Text>

            </Modal>
          </BdgImg>
        
        </MyBox>
    );

    }
export default HeroSection

const MyBox = styled(Box)({
    // padding:"50px 0px",P
    height:"80vh",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    "@media screen and (max-width:768px)":{
        height:"60vh",
    }
})
const BdgImg = styled(Box)({
    height:"100%",
    width:"100%",
    // backgroundImage: `url(${img1})`,
    backgroundColor:"darkblue",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
    backgroundPosition:"fixed",
   
    
    
})
const Modal = styled(Box)({
    height:"100%",
    width:"100%",
    background: `rgba(0, 0, 0, 0.4)`,
   backdropFilter: `blur(1px)`,


    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    flexWrap:"wrap",
    textAlign:"center",
})
const Text = styled(Typography)({
    fontSize:"40px",
    fontWeight:"bold",
    color:"white",
    padding:"20px 0px",
    "@media screen and (max-width:768px)":{
        fontSize:"25px",
    }
})
const ButtonB = styled(Box)({
    backgroundColor:"darkblue",
    borderRadius:"10px",
    padding:"8px",
    color:'white',
    fontWeight:"bold",
    cursor:"pointer",
})
// const BdgImg = styled(Box)({
// })