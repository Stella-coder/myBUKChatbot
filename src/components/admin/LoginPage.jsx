import { Box } from "@mui/material"
import { styled } from "@mui/system"
import { Button, Input } from "antd"
import React,{useState} from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../base"
import { useNavigate } from "react-router-dom";


const auth = getAuth(app);
const LoginPage = ()=>{
    const nav = useNavigate()
    const[username, setUserName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault();
    
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Handle successful login
            const user = userCredential.user;
            console.log("Login success:", user);
            nav("/dashboard")
          })
          .catch((error) => {
            // Handle login error
            console.error("Login error:", error);
          });

      };

    return(
        <Container>
            <Header>Admin login only</Header>
            <Wrapper>
                <Input style={{margin:"10px 0px"}}
                placeholder="Username"
                value={username}
                onChange={(e)=>{
                    setUserName(e.target.value)
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
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                />
                <Button style={{margin:"20px 0px", backgroundColor:"blue", color:"white", width:"290px"}} onClick={handleLogin}>Login</Button>
            </Wrapper>
        </Container>
    )
}

export default LoginPage

const Container = styled(Box)({
    paddingTop:"80px",
    width:"100%",
    // height:"80vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column"
})
const Header = styled("div")({
    fontSize:"20px",
    fontWeight:"bold",
    margin:"20px"
})

const Wrapper = styled(Box)({
    width:"290px",
    height:"300px",
    border:"2px solid gray",
    borderRadius:"10px",
    padding:"10px"
})
// const Container = styled(Box)({})