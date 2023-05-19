import { Box } from "@mui/material"
import React,{useState} from "react"
import { styled } from "@mui/styles"
import { Button, Input } from "antd"
import app from "../base"
// import firebase from 'firebase/compat/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import TextArea from "antd/es/input/TextArea"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


const firestore = getFirestore(app);
const CreateIntent = ()=>{
    const [patternInput, setPatternInput] = useState([" "])
    const [inputList, setInputList] = useState([{tag:"", patterns:patternInput, responses:[]}])
  const handleAddInput =()=>{
    const values =[...inputList]
    values.push({tag:'', patterns:[], responses:[]})
    setInputList(values)

  }
  const handleAddPatternInput =()=>{
    const values =[...patternInput]
    values.push(" ")
    setPatternInput(values)

  }
  const handleDeletePattern = (index)=>{
    const values =[...patternInput]
    values.splice(index,1)
    setPatternInput(values)
   }
    const handleInputChange = (index,event)=>{
    const {name,value} = event.target
    const list =[...inputList]
    list[index][name]=value
    setInputList(list)
   }
    const handleInputChangePatterns = (index,event)=>{
        const values = [...patternInput];
        values[index] = event.target.value;
        setPatternInput(values);
   }


   const handleDelete = (index)=>{
    const values =[...inputList]
    values.splice(index,1)
    setInputList(values)
   }

   


   const handleFormSubmit = async (event) => {
    event.preventDefault();

    // const dataCollection = collection(firestore, 'intents');
    inputList.forEach((input) => {
        console.log(input)
        const dataCollection = collection(firestore, 'intents');
    const newData = {    
                        tag:input.tag,
                         patterns: patternInput,
                         responses: [input.responses]
        }
    try {
            // Add the data to the collection
     addDoc(dataCollection, newData);
     console.log('Data submitted successfully');
      } catch (error) {
        console.error('Error submitting data:', error);
      }
        
      
    });

    // Reset inputs
    setInputList([{ tag: '', patterns:"", responses:""}]);
    setPatternInput([" "])
    
  };

  console.log(patternInput)
    return(
        <Container>
            <Wrapper>
                
                {
                    inputList.map((item, index)=>{
                        return(
                            <HoldInput key={index}>
                            <Input 
                            name="tag"
                            value = {item.tag}
                            style={{margin:"10px 0px"}}
                           placeholder="Tag"
                           onChange={(event)=>handleInputChange(index,event)}
                               />
                 Patterns
                         {
                            patternInput.map((pat,i)=>(
                                <div key={i}>
                                   
                                    <TextArea rows={3}
                         name="patterns"
                         value={pat}
                          style={{margin:"10px 0px"}}
                             placeholder="Pattern"
                             onChange={(event)=>handleInputChangePatterns(i,event)}
                            />
                             
                             <AddInput onClick= {handleDeletePattern}><DeleteIcon sx={{color:"tomato"}}/></AddInput>
                                </div>
                            ))
                         }
                         <AddInput onClick= {handleAddPatternInput}><AddIcon/> </AddInput>
                              <TextArea rows={4}
                              name="responses"
                              value={item.responses}
                              style={{margin:"10px 0px"}}
                          placeholder="Responses"
                          onChange={(event)=>handleInputChange(index,event)}
                               />
                               <AddInput onClick={()=>{handleDelete(index)}} ><DeleteIcon sx={{color:"tomato"}}/></AddInput> 
                </HoldInput>
                        )
                    })
                }
                
                <AddInput onClick= {handleAddInput}><AddIcon/></AddInput>
                <Button onClick={handleFormSubmit} style={{width:"290px", backgroundColor:"blue", color:"white"}}> Create </Button>
            </Wrapper>
        </Container>
    )
}

export default CreateIntent


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