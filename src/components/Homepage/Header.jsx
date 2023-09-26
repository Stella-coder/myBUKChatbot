import React,{useState, useEffect, useContext} from "react"
import {Box} from "@mui/material"
import {styled} from "@mui/styles"
 import { Link, useNavigate } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from "../../Auth/AuthState";
import app from "../../base";
import {getAuth} from  "firebase/auth"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import App from "../../App";

const firestore = getFirestore(App);
const Header = () => {
    const nav = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [toggle, setToggle] = useState(false)
    const [checkAdmin, setCheckAdmin] = useState("")

   
    const changeToggle =()=>{
        setToggle(!toggle)
        // console.log(toggle)
    }
    
    const check = async () => {
        try {
          const querySnapshot = await getDocs(
            query(collection(firestore, 'users'), where('role', '==', 'admin'))
          );
      
          const isAdmin = !querySnapshot.empty; // True if there is at least one document with role "admin"
        //   setCheckAdmin(isAdmin); // Set the checkAdmin state based on the result
          
          if (isAdmin) {
            setCheckAdmin("admin")
            return 'admin'; // Return 'admin' if the user's role is admin
          }
      
          // If not an admin, check for other roles (e.g., 'mediator')
          const mediatorQuerySnapshot = await getDocs(
            query(collection(firestore, 'users'), where('role', '==', 'mediator'))
          );
      
          const isMediator = !mediatorQuerySnapshot.empty; // True if there is at least one document with role "mediator"
          
          if (isMediator) {
            setCheckAdmin("mediator")
            return 'mediator'; // Return 'mediator' if the user's role is mediator
          }
          setCheckAdmin("empty")
          // If neither admin nor mediator, return a different value (e.g., 'empty')
          return 'empty';
        } catch (error) {
          console.error('Error checking user role:', error);
          setCheckAdmin(false); // Handle errors and set checkAdmin to false
          return 'error'; // Return an error value
        }
      };
      

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
console.log(checkAdmin, "admin")
    useEffect(()=>{
        check()
    },[])
    return(
        <>
                <MyContainer  >
            <Wrapper>
                <MenuH onClick={changeToggle}><MenuIcon/></MenuH>
                <Logo>HCCS</Logo>
                <Wrapper2> 
                    <Link to="/"style={{textDecoration:"none", color:"white"}} >
                    <MyTypography sx={{fontSize:"12px", textDecoration:"none", }}>Home</MyTypography>
                    </Link>
                   
                    <Link to ="/" style={{textDecoration:"none", color:"white"}}>
                    <MyTypography sx={{fontSize:"12px"}}>About</MyTypography>
                    </Link>
                    {
                        checkAdmin === "empty"?
                        <Link to ="/message" style={{textDecoration:"none", color:"white"}}>
                    <MyTypography sx={{fontSize:"12px"}}>Message</MyTypography>
                    </Link>
                    : checkAdmin === "mediator"?
                    <Link to ="/complains" style={{textDecoration:"none", color:"white"}}>
                    <MyTypography sx={{fontSize:"12px"}}>View Complains</MyTypography>
                    </Link>:
                    checkAdmin === "admin"?
                    <Link to ="/dashboard" style={{textDecoration:"none", color:"white"}}>
                    <MyTypography sx={{fontSize:"12px"}}>Admin Dashboard</MyTypography>
                    </Link>:null
                   
                    }
                 </Wrapper2> 
                  <LoginButton> 
                   {
                        currentUser? 
                        <div onClick={handleLogout} style={{fontSize:"12px"}}>LOG OUT</div>
                        :
                        <Link to="/login" style={{textDecoration:"none", color:"white"}}>
                        <MyTypography sx={{fontSize:"12px"}}>Login</MyTypography>
                        </Link>
                    }
                </LoginButton>
              
              
            </Wrapper>
        </MyContainer>
        {
            toggle?
            <MobileWrapper>
            <div style={{width:"100%", display:"flex", justifyContent:"center", cursor:"pointer"}} onClick={changeToggle}>X</div>
            <WrapText>
            <Link to="/"style={{textDecoration:"none", color:"white"}} >
                    <MyTypographyMobile onClick={changeToggle} sx={{fontSize:"12px", textDecoration:"none", }}>Home</MyTypographyMobile>
                    </Link>
                    
                    <Link to ="/" style={{textDecoration:"none", color:"white"}}>
                    <MyTypographyMobile onClick={changeToggle} sx={{fontSize:"12px"}}>About</MyTypographyMobile>
                    </Link>

                    {
                        currentUser? 
                        <div onClick={handleLogout} style={{fontSize:"12px"}}>LOG OUT</div>
                        :
                        <Link to="login" style={{textDecoration:"none", color:"white"}}>
                        <MyTypographyMobile onClick={changeToggle}  sx={{fontSize:"12px"}}> Login</MyTypographyMobile>
                        </Link>
                    }
            </WrapText>
        </MobileWrapper>
        : null
           }
        </>
    )
}
export default Header

 const MyContainer = styled(Box)({
        height:"80px",
        width:"100%",
        position:"fixed",
        color:"white",
        zIndex:10,
        transition:"all 350ms",
        backgroundColor:"rgb(0,0,83)"
       
    }) 
    const Wrapper = styled(Box)({
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center"
       
    }) 
    const Logo = styled("div")({  
        letterSpacing: 2,
        fontWeight:"bold",
        "@media screen and (min-width:768px)":{
            // flex:0.7
        }
    }) 
    const WrapText = styled("div")({  
    display:"flex",
    flexDirection:'column',
    height:"50vh",
    justifyContent:"space-around",
    padding:"0px 20px",
    }) 
    const MenuH = styled("div")({  
        "@media screen and (min-width:768px)":{
            display:"none"
        }
    }) 
    const Wrapper2 = styled(Box)({
        display:"flex",
        justifyContent:"space-around",
        minWidth:"500px",
        "@media screen and (max-width:768px)":{
            display:"none"
        }
        
    }) 

    const MobileWrapper = styled(Box)({
         height:"100vh",
         width:"100vw",
         backgroundColor:"rgba(27,32,36, 0.99)" ,
         display:"flex",
        //  justifyContent:"center",
        color:"white",
         position:"fixed",
         flexDirection:'column',
         zIndex:1000,
         "@media screen and (min-width:768px)":{
            display:"none"
        }
       
    }) 
    const MyTypography = styled("div")({
        // margin:"10px 5px",
        fontSize:"11px",
        textTransform:"uppercase",
        cursor:"pointer" ,
        transition:"all 350ms",
        
        "&:hover" :{
            color:"gray",
        }    
    }) 
    const MyTypographyMobile = styled("div")({
        // margin:"10px 5px",
        fontSize:"11px",
        textTransform:"uppercase",
        cursor:"pointer" ,
        transition:"all 350ms",
        borderBottom:" 1px solid darkblue",
        padding:"5px 0px",
        
        "&:hover" :{
            color:"gray",
        }    
    }) 
    const LoginButton = styled("div")({
        backgroundColor:"darkblue",
        borderRadius:"10px",
        padding:"8px",
        color:'white',
        fontWeight:"bold",
        cursor:"pointer",
        "@media screen and (max-width:768px)":{
            display:"none"
        }
    })