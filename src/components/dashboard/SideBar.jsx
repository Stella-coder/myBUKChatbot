import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import app from "../../base"
import { getAuth } from "firebase/auth"
import { AuthContext } from "../../Auth/AuthState"
import {  collection, getDocs, getFirestore, query, where } from "firebase/firestore"

const firestore = getFirestore(app);
const SideBar = ()=>{
    const nav = useNavigate();
    const [data, setData] = useState([])
    const {currentUser} = useContext(AuthContext)
    
    
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

    const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(
            query(collection(firestore, 'users'), where('role', '!=', ''))
          );
      
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          setData(fetchedData);
          console.log(data, "data");
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(()=>{
        fetchData()
      },[])
     
    return(
        <Container>
            <Logo>HCCS</Logo>
            {currentUser ? (
  currentUser.email === "admin@gmail.com" ? (
    <Wrapper>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <Holder>Home</Holder>
      </Link>
      <Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>
        <Holder>Dashboard</Holder>
      </Link>
      <Link to="/add" style={{ textDecoration: "none", color: "white" }}>
        <Holder>+ Add Mediator</Holder>
      </Link>
      <Holder onClick={handleLogout}>Log out</Holder>
    </Wrapper>
  ) : (
    <Wrapper>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <Holder>Home</Holder>
      </Link>
      <Link to="/complains" style={{ textDecoration: "none", color: "white" }}>
        <Holder>Complains</Holder>
      </Link>
      <Holder onClick={handleLogout}>Log out</Holder>
    </Wrapper>
  )
) : 
<Wrapper>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <Holder>Home</Holder>
      </Link>
      <Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>
        <Holder>Dashboard</Holder>
      </Link>
      <Link to="/add" style={{ textDecoration: "none", color: "white" }}>
        <Holder>+ Add Mediator</Holder>
      </Link>
      <Holder onClick={handleLogout}>Log out</Holder>
    </Wrapper>
}

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
    margin:"20px",
    letterSpacing: 2,
    fontWeight:"bold",

})
// "@media screen and (max-width:768px)":{
//     display:
//  }
// const Container = styled(Box)({
//     width:"100%",
//     display:"flex",
// })