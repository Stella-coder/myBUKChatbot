import React,{useState, useEffect, useContext} from "react"
import {Box} from "@mui/material"
import {styled} from "@mui/styles"
 import { Link, useNavigate } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from "./admin/AuthState";
import app from "./base";
import {getAuth} from  "firebase/auth"


const Header = () => {
    const { currentUser } = useContext(AuthContext);
    
        const [toggle, setToggle] = useState(false)
   
    const changeToggle =()=>{
        setToggle(!toggle)
        // console.log(toggle)
    }
    

    const[navbar, setNavbar] = useState(false)

    const changeBgColor = ()=> {
        // console.log(window.scrollY)
        if (window.scrollY >=100){
            setNavbar(true)
        }else{
            setNavbar(false)
        }
       
    }

    const nav = useNavigate();

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

    useEffect(()=>{
        changeBgColor()
        window.addEventListener("scroll", changeBgColor)
    })
    return(
        <>
                <MyContainer sx={{backgroundColor: navbar? "#1B2024": "darkblue"}} >
            <Wrapper>
                <MenuH onClick={changeToggle}><MenuIcon/></MenuH>
                <Logo> logo</Logo>
                <Wrapper2> 
                    <Link to="/"style={{textDecoration:"none", color:"white"}} >
                    <MyTypography sx={{fontSize:"12px", textDecoration:"none", }}>Home</MyTypography>
                    </Link>
                   
                    <Link to ="/chatbot" style={{textDecoration:"none", color:"white"}}>
                    <MyTypography sx={{fontSize:"12px"}}>Chatbot</MyTypography>
                    </Link>
                   
                   
                    
                    {
                        currentUser? <Link to="/dashboard" style={{textDecoration:"none", color:"white"}}>
                        <MyTypography  sx={{fontSize:"12px"}}>Admin dashboard</MyTypography>
                        </Link>: null
                    }
                   
                   {
                        currentUser? 
                        <div onClick={handleLogout} style={{fontSize:"12px"}}>LogOut</div>
                        :
                        <Link to="login" style={{textDecoration:"none", color:"white"}}>
                        <MyTypography sx={{fontSize:"12px"}}> Admin Login</MyTypography>
                        </Link>
                    }
                </Wrapper2>
              
              
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
                    
                    <Link to ="/chatbot" style={{textDecoration:"none", color:"white"}}>
                    <MyTypographyMobile onClick={changeToggle} sx={{fontSize:"12px"}}>Chatbot</MyTypographyMobile>
                    </Link>
                    {
                        currentUser? <Link to="/dashboard" style={{textDecoration:"none", color:"white"}}>
                        <MyTypographyMobile  sx={{fontSize:"12px"}}>Admin dashboard</MyTypographyMobile>
                        </Link>: null
                    }
                    {
                        currentUser? 
                        <div onClick={handleLogout} style={{fontSize:"12px"}}>LogOut</div>
                        :
                        <Link to="login" style={{textDecoration:"none", color:"white"}}>
                        <MyTypographyMobile sx={{fontSize:"12px"}}> Admin Login</MyTypographyMobile>
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
       
    }) 
    const Wrapper = styled(Box)({
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center"
       
    }) 
    const Logo = styled("div")({  
        
        "@media screen and (min-width:768px)":{
            flex:0.7
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
        width:"500px",
        
        "@media screen and (max-width:768px)":{
            display:"none"
        }
        
    }) 
    // const Cart = styled(Box)({
    //       display:"flex",
    //       position:"relative",
    //       cursor:"pointer"
    // }) 
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
    
    
