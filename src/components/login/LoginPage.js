import { Box } from "@mui/material"
import { styled } from "@mui/system"
import { Button, Input } from "antd"
import React,{useContext, useState} from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../base"
import { useNavigate } from "react-router-dom";
import {  addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { AuthContext } from "../../Auth/AuthState";


const auth = getAuth(app);
const firestore = getFirestore(app);
const LoginPage = ()=>{

const[toggle, setToggle] = useState(false)


    const changeToggle = ()=>{
        setToggle(!toggle)
    }

    // const {user} = useContext(AuthContext)
    const nav = useNavigate()
    // const[username, setUserName] = useState("")
    const[username, setUsername] = useState("")
    
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const signUp = async () => {
        
       const saveUser =  // Create a new user with email and password
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Handle successful sign-up
            const user = userCredential.user;
            const newData = {
                username,
                email,
                password,
               userId: user.uid
            }
            console.log('Sign-up successful:', user);
            if (user) {
                const docRef = collection(firestore, 'users');
                          addDoc(docRef, newData);
                          console.log('Data sent successfully');
                          alert('Created successfully');
            
              setUsername(""); 
              setEmail("");
              setPassword("");
              nav("/message")
              
            }
        })
        console.log(saveUser, "users")
      };
    

    const handleLogin = (e) => {
        e.preventDefault();
    
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Handle successful login
            const user = userCredential.user;       
            nav("/")
          })
          .catch((error) => {
            // Handle login error
            alert("Login error:", error.message)
            console.error("Login error:", error);
          });

      };
     

    return(
        <Container>
           { 
           toggle?
           <Wrapper2>
               Sign up
           <Input style={{margin:"10px 0px"}}
           placeholder="username"
           value={username}
           onChange={(e)=>{
               setUsername(e.target.value)
           }}
           />
           <Input style={{margin:"10px 0px"}}
           placeholder="Email"
           value={email}
           onChange={(e)=>{
               setEmail(e.target.value)
           }}
           />
           <Input style={{margin:"10px 0px"}}
           placeholder="password"
           value={password}
           type="password"
           onChange={(e)=>{
               setPassword(e.target.value)
           }}
           />
           <Button style={{margin:"20px 20px", backgroundColor:"blue", color:"white", width:"280px"}} onClick={signUp}>Sign Up</Button>
           <Text>Already have an account? <Textlink onClick={changeToggle}> Log In</Textlink> </Text>
       </Wrapper2>
        :
        <Wrapper2>
            Login
            <Input 
            style={{
                margin:"10px 0px"
            }}
            placeholder="Enter your email"
            value={email}
           onChange={(e)=>{
               setEmail(e.target.value)
           }}
            />
            <Input
            style={{
                margin:"10px 0px"
            }}
             placeholder="Enter your password"
             value={password}
           onChange={(e)=>{
               setPassword(e.target.value)
           }}
            />
            <Button
            onClick={handleLogin}
            style={{
                margin:"10px 0px",
                width:"100%"
            }}
            >Login</Button>
            <Text>Do not have an account? <Textlink onClick={changeToggle}> Sign In</Textlink> </Text>
        </Wrapper2>    
        
        }

        </Container>
    )
}

export default LoginPage

const Container = styled(Box)({
    display:"flex",
    width:"100%",
    minHeight:"100vh",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    backgroundColor:"darkblue",
})

const Wrapper = styled(Box)({
    display:"flex",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    
})
const Wrapper2 = styled(Box)({
    display:"flex",
    width:"450px",
    minHeight:"300px",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    border:"1px dashed white",
    padding:"5px",
    background:"rgba(255,255,255,0.2)",
    boxShadow: "0px 4px 30px rgba(0,0,,0,0.1)",
    backdropFilter:"blur(5px)",
    border:"1px solid rgba(255,255,255,0.3)",
    margin:"5px 0px",
    borderRadius:"5px",
    "@media screen and (max-width:768px)":{
        width:"280px"
    }
    
    
})
const Text = styled(Box)({
    display:"flex"
})
const Textlink = styled(Box)({
    cursor:"pointer",
    fontWeight:"bold",
    marginLeft:"3px"
})
// const Container = styled(Box)({})