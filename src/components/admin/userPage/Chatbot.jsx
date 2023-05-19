import { Input } from "@mui/material"
import { styled } from "@mui/styles"
import React,{ useEffect, useState } from "react"
import axios from "axios"
import SendIcon from '@mui/icons-material/Send';

const Chabot = () =>{
    const [ch, setCh] = useState("")
    const [userInput, setUserInput] = useState("")
    const [message, setMessage] = useState([])
    const [data, setdata] = useState([])
    // const [chatbotMessage, setChatbotMessage] = useState([])

    const handleSubmit = ()=>{
        axios.post("http://127.0.0.1:5000/user", {"msg": userInput})
        .then(res=>{
            setMessage(message => [...message, {from:"user", msg: userInput}, {from:"cb", msg: res.data}]);
            console.log(message, res, message[0].from, userInput)
            localStorage.setItem("message", JSON.stringify(message));
            setUserInput("")
        })
        .catch(err=>{
            console.log(err)
        })
    }


const getData = () => {
    const savedData = localStorage.getItem("message");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setdata(parsedData);
      console.log(data)
    }
  };
   
//   useEffect(()=>{
// getData()

// },[])
// console.log(data, "data")
// console.log(message, "message")

    return(
        <Container>
            <Wrapper>
                {
                    message.map((msg,i)=>(
                        message[i].from === "user" ?
                        (
                            <div key={i} style={{width:"100%", justifyContent:"flex-start"}}>
                            <UserMessage>
                                {msg.msg}
                            </UserMessage>
                            </div>   
                        )
                        :
                        (
                            <div key={i} style={{width:"100%", display:"flex", justifyContent:"flex-end", }}>
                            <UserMessage style={{backgroundColor:"blue", color:"white"}} >
                                {msg.msg}
                            </UserMessage>
                            </div>
                        
                        )

                    ))
                }
              
            </Wrapper>
            <Bottom>
                <Message>

<input 
placeholder="Enter message"
style={{border:"none", outline:"none",width:"90%"}}
value={userInput}
onChange={(e)=>setUserInput(e.target.value)}
/>
                </Message>
                <Send onClick={handleSubmit}><SendIcon/></Send>
            </Bottom>
        </Container>
    )
}

export default Chabot

const Container = styled("div")({
height:"100%",
width:"100%",
backgroundColor:"lavender",
paddingTop:"90px",
// padding:"20px",
display:"flex",
flexDirection:"column",
alignItems:"center",


})

const Wrapper = styled("div")({
    width:"90%",
    // flex:1,
    display:"flex",
    flexDirection:"column",
    // justifyContent:"flex-end",
    alignItems:"flex-end",
    height:"70vh",
    // backgroundColor:"red",
    overflowY:"scroll",
    
})

const UserMessage = styled("div")({
   backgroundColor:"lightblue",
    minWidth:"80px",
    maxWidth:"250px",
    margin:"10px",
    padding:"10px",
    borderRadius:"20px 5px",
    display:"flex",
    overflowWrap:"break-word",
    justifyContent:'flex-start',

"@media screen and (min-width:768px)":{
        maxWidth:"350px",
    }
})

const Bottom = styled("div")({
    display:"flex",
    width:"100%",
    margin:"10px 10px",
    justifyContent:"center",
    alignItems:"center"
})
const Send = styled("div")({
    margin:"0px 10px",
    
})
const Message = styled("div")({
padding:"0px 10px",
    backgroundColor:"white",
    width:"80%",
    height:"40px",
    borderRadius:"20px",
    display:"flex",
    alignItems:"center"
})