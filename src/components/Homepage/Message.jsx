import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import React, { useContext, useEffect, useState } from "react"
import Header from "./Header"
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore"
import app from "../../base"
import { AuthContext } from "../../Auth/AuthState"

const firestore = getFirestore(app);

const Message = ()=>{
  
    const { currentUser } = useContext(AuthContext);
    const [data, setData] = useState([])
    console.log(currentUser.uid, "user")
  

    // const userId = currentUser.uid;
    const fetchData = async () => {
      
    if(currentUser){
        const id = currentUser.uid;
        try {
            // Create a reference to the Firestore collection
            const dataCollection = collection(firestore, 'complains'); // Replace with your collection name
    
            // Create a query to filter data based on a specific field
            const querySnapshot = await getDocs(
              query(dataCollection, where('userId', '==', id)) 
            );
    
            const fetchedData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            setData(fetchedData[0]);
            console.log(data, "data");
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    }

    useEffect(() => { 
        fetchData();
       
      }, [currentUser]);

// console.log(data.date, "datatt")
    return(
        <Container>
            <Header/>
            <Wrapper>
                <Holder>
                    <MessageIcon>Message</MessageIcon>
                    {
                        data?
                        <MessageHolder>
                        Hello {data.firstname},
                       {
                        data.date === undefined? <Mes> No schedule yet, kindly check back later. </Mes>:  <Mes>Your complain has been approved and your physical meeting has been schedule for {data.date}.</Mes>
                       }
                    </MessageHolder>:
                    <MessageHolder>
                    Hello,
                    <Mes> No message yet, kindly send complain to get a schedule </Mes>
                </MessageHolder>
                    }
                </Holder>
            </Wrapper>
        
        </Container>
    )
}


export default Message

const Container = styled(Box)({})
const Wrapper = styled(Box)({
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    minHeight:"90vh",
    paddingTop:"80px"

})
const Holder = styled(Box)({
width:"80%",
minHeight:"300px",
// backgroundColor:"blue",
borderRadius:"10px",
background:"rgba(255,255,255,0.2)",
boxShadow: "0px 3px 8px ",
padding:"10px"
})
const MessageIcon = styled(Box)({
    display:"flex",
    justifyContent:"center",
    margin:"10px 0px"
})
const MessageHolder = styled(Box)({
    fontStyle:"italic",
    letterSpacing:"1.5px",
    lineHeight:1.5,
})
const Mes = styled(Box)({})
// const Container = styled(Box)({})