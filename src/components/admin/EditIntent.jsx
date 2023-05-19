import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import { Button, Input } from "antd"
import React,{useState} from "react"
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from "../base"

const firestore = getFirestore(app);


const EditIntent = ()=>{
    const [tag, setTag] = useState("")
    const [patterns, setPatterns] = useState([])
    const [responses, setResponses] = useState([])
 


const handleUpdateData = async () => {
    try {
      const docRef = doc(firestore, 'intents', 'your-document'); // Replace 'your-collection' and 'your-document' with your actual collection and document IDs
      await updateDoc(docRef, { tag }); // Replace 'name' with the field you want to update
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your desired action with the inputList data
    console.log(tag,responses,patterns);
  };
  
    return(
        <Container>
            <Wrapper>
                            <HoldInput >
                            <Input 
                            
                            value = {tag}
                            style={{margin:"10px 0px"}}
                           placeholder="Tag"
                           onChange={(e)=>
                        setTag(e.target.value) 
                        }
                               />
                
                         <Input
                         name="patterns"
                         value={patterns}
                          style={{margin:"10px 0px"}}
                             placeholder="Pattern"
                             onChange={(e)=>
                                setPatterns(e.target.value) 
                                }
                            />
                              <Input
                              name="responses"
                              value={responses}
                              style={{margin:"10px 0px"}}
                          placeholder="Responses"
                          onChange={(e)=>
                            setResponses(e.target.value) 
                            }
                               />
                            
                </HoldInput>
                
                <Button onClick={handleSubmit} style={{width:"290px", backgroundColor:"blue", color:"white"}}> Create </Button>
            </Wrapper>
        </Container>
    )
}

export default EditIntent


const Container = styled(Box)({
    paddingTop:"80px",
    width:"100%",
    minHeight:"85vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
})
const Wrapper = styled(Box)({
width:"290px",
minHeight:"300px",
borderRadius:"3px",
border:"2px solid gray",
padding:"10px",
margin:"20px"
})
const HoldInput = styled(Box)({
borderBottom:"1px dashed gray",
margin:"10px"
})
const AddInput = styled(Box)({
display:"flex",
width:"100%",
justifyContent:"flex-end"
})
// const Container = styled(Box)({

// })