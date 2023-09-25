import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import app from "../../base"
import { getAuth } from "firebase/auth"
import { AuthContext } from "../../Auth/AuthState"
import { Firestore, collection, getDocs, query, where } from "firebase/firestore"

const SideBar = ()=>{
    const nav = useNavigate();
    const {currentUser} = useContext(AuthContext)
    const check = ()=>{
        try {
            const querySnapshot =  getDocs(
              query(collection(Firestore, 'users'), where('role', '!=', ''))
            );
        
            return !querySnapshot.empty; // Return true if there is at least one document
          } catch (error) {
            console.error('Error checking if user with role exists:', error);
            return false; // Handle errors and return false
          }
    }
console.log("check", check)
    const handleLogout = async () => {
      try {
        // Sign out the user using Firebase Auth
        await getAuth(app).signOut();
  
        // Redirect to the login page or any other desired page
        nav("/");
      } catch (error) {
        console.log(error);
      }
    };
    return(
        <Container>
            <Logo> - MDCM</Logo>
            <Wrapper>
            <Link to="/dash" style={{textDecoration:"none", color:"white"}}>
                <Holder>Dashboard</Holder>
                </Link>
                <Link to="/add" style={{textDecoration:"none", color:"white"}}>
                <Holder>+ Add Mediator</Holder>
                </Link>
                <Holder onClick={handleLogout}>Log out</Holder>
            </Wrapper>
            <Wrapper>
            <Link to="/complains" style={{textDecoration:"none", color:"white"}}>
                <Holder>Complains</Holder>
                </Link>
                <Link to="/appointments" style={{textDecoration:"none", color:"white"}}>
                <Holder>Appointments</Holder>
                </Link>
                <Holder>Log out</Holder>
            </Wrapper>
        </Container>
    )
}

export default SideBar

const Container = styled(Box)({
    width:"20%",
    display:"flex",
    color:"white",
    flexDirection:"column",
    height:"100vh",
    position:"fixed",
    backgroundColor:"darkblue"
    
})
const Wrapper = styled(Box)({
    width:"100%",
    display:"flex",
    flexDirection:"column",
    color:"white",
    padding:"5px"
})
const Holder = styled(Box)({
    width:"80%",
    height:"40px",
    display:"flex",
    fontSize:"12px",
    margin:"10px 0px",
    // padding:"5px",
    backgroundColor:"blue",
    borderRadius:"2px",
    cursor:"pointer",
    justifyContent:"center",
    alignItems:"center"
})
const Logo = styled(Box)({
    display:"flex",
    margin:"20px 0px"
})
// "@media screen and (max-width:768px)":{
//     display:
//  }
// const Container = styled(Box)({
//     width:"100%",
//     display:"flex",
// })