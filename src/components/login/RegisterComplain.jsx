import { Box } from "@mui/material"
import { styled } from "@mui/system"
import { Button, Input, Select } from "antd"
import React,{useContext, useState} from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../base"
import { useNavigate } from "react-router-dom";
import img from "../1.png"
import { AuthContext } from "../../Auth/AuthState";
import {  addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Headerr from "../Homepage/Header";
import { Option } from "antd/es/mentions";


const auth = getAuth(app);
const firestore = getFirestore(app);
const SubmitComplain = ()=>{


    const { currentUser } = useContext(AuthContext);
    const nav = useNavigate()
    // const[username, setUserName] = useState("")
    const[firstname, setFirstname] = useState("")
    const[surname, setSurname] = useState("")
    // const[email, setEmail] = useState("")
    const[state, setState] = useState("")
    const[DOB, setDOB] = useState("")
    const[address, setAddress] = useState("")
    const[phoneNo, setPhoneNo] = useState("")
    const[year, setYear] = useState("")
    const[type, setType] = useState("Select type of marriage conflict")
    const[spouseName, setSpouseName] = useState("")
    const[spouseNo, setSpouseNo] = useState("")
    const [image, setImage] = useState(img);
    const [avatar, setAvatar] = useState("");
    const [percent, setPercent] = useState(0);

    const handleOptionChange = (e) => {
        setType(e.target.value);
      };
      console.log(currentUser.uid, "user")

    const submit = async () => {
        if (currentUser) {
            const newData = {
                firstname,
                surname,
                state,
                address,
                phoneNo,
                year,
                type,
                spouseName,
                spouseNo,
                avatar,
                userId:currentUser.uid
               
            }
            const docRef = collection(firestore, 'complains');
                      addDoc(docRef, newData);
                      console.log('Data submitted successfully');
                      alert('Your complain has been submitted successfully, kindly checked back in 5 working hours you will recieve a message soon.');   
                    nav("/message")
                    }
        else{
            alert("Kindly Login")
        }
      };
    
      const storage = getStorage();
      const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const save = URL.createObjectURL(file);
          setImage(save);
      
          const fileRef = ref(storage, "avatar/" + file.name);
      
          try {
            const uploadTask = uploadBytesResumable(fileRef, file);
      
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPercent(progress);
                console.log("Upload is " + progress + "% done");
              },
              (error) => {
                console.error("Upload error:", error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log("File available at", downloadURL);
                  setAvatar(downloadURL);
                });
              }
            );
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
      };
    //   console.log(currentUser.uid, "user")
      
    return(
        <>
        <Headerr/>
        <Container>
            
           
           <Wrapper2>
            <Header>Fill the complaint form</Header>
              <ImageHolder>
                <Image src={image}/>
                </ImageHolder> 
                <HoldLabel>
              <Input type="file" id="up" onChange={uploadImage}/>
            </HoldLabel>
            <Label htmlFor="up">Upload passport</Label>
           <Input style={{margin:"10px 0px"}}
           placeholder="Enter your first name"
           value={firstname}
           onChange={(e)=>{
               setFirstname(e.target.value)
           }}
           />
           <Input style={{margin:"10px 0px"}}
           placeholder="Enter your surname"
           value={surname}
           onChange={(e)=>{
               setSurname(e.target.value)
           }}
           />
           <Input style={{margin:"10px 0px"}}
           placeholder="State of origin"
           value={state}
           onChange={(e)=>{
               setState(e.target.value)
           }}
           />
           <Input style={{margin:"10px 0px"}}
           placeholder="Full residence address"
           value={address}
           onChange={(e)=>{
               setAddress(e.target.value)
           }}
           />
           <Input style={{margin:"10px 0px"}}
           placeholder="Phone Number"
           value={phoneNo}
          
           onChange={(e)=>{
               setPhoneNo(e.target.value)
           }}
           />
           <Input style={{margin:"10px 0px"}}
           placeholder="DOB"
           value={DOB}
          
           onChange={(e)=>{
               setDOB(e.target.value)
           }}
           />
            <Input style={{margin:"10px 0px"}}
           placeholder="Year of marriage"
           value={year}
           onChange={(e)=>{
               setYear(e.target.value)
           }}
           />
           <select style={{width:"100%"}}  onChange={handleOptionChange}>
            <option >Select type</option>
            <option value="marriage Violence">Marriage Violence</option>
            <option value="Not caring fro the family">Not caring fro the family</option>
            <option value ="Restriction of academic life">Restriction of academic life</option>
            <option value ="Lack of financial provision">Lack of financial provision</option>
            <option value="Others">Others</option>
           </select>
           <Input style={{margin:"10px 0px"}}
           placeholder="Spouse's name"
           value={spouseName}
           onChange={(e)=>{
               setSpouseName(e.target.value)
           }}
           />
            <Input style={{margin:"10px 0px"}}
           placeholder="Spouse phone number"
           value={spouseNo}
           onChange={(e)=>{
               setSpouseNo(e.target.value)
           }}
           />
           <Button onClick={submit} style={{margin:"20px 20px", backgroundColor:"blue", color:"white", width:"100%"}} >Submit Complain</Button>
          
       </Wrapper2>
    

        </Container>
        </>
    )
}

export default SubmitComplain

const Container = styled(Box)({
    display:"flex",
    width:"100%",
    minHeight:"100vh",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    // backgroundColor:"white",
    // color:"white",
    paddingTop:"80px"
})
const Header = styled(Box)({
    fontSize: "25px",
    fontFamily: "Montserrat",
    fontStyle:"italic",
    fontWeight:"bold",
    margin:"20px 0px",
})

const Wrapper2 = styled(Box)({
    display:"flex",
    width:"90%",
    minHeight:"300px",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    padding:"5px",
    background: "rgba(255, 255, 255, 0.2)",
// borderRadius: "16px",
boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
backdropFilter: "blur(5px)",
// webkitBackdropFilter: "blur(5px)",
border: "1px solid rgba(255, 255, 255, 0.3)",
    margin:"5px 0px",
    borderRadius:"5px",
    "@media screen and (max-width:768px)":{
        
    }
    
    
})
const ImageHolder = styled(Box)({
    display:"flex",
    width:"100%",
    height:"150px",
    justifyContent:"flex-end"
})
const Image = styled("img")({
    display:"flex",
    height:"100%",
    width:"150px",
    backgroundColor:"white",
    borderRadius:"5px",
    objectFit:"cover",
    "@media screen and (max-width:768px)":{
        
    }
})

const HoldLabel = styled("div")({
    display: "none",
  })
  
  const Label = styled("label")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    height: "34px",
    width: "100%",
    backgroundColor: "blue",
    border: "none",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: 600,
    fontFamily: "Montserrat",
    transition: "all 350ms",
    transform: "scale(1)",
    margin: "5px 5px",
    "&:hover": {
      transform: "scale(0.94)",
    }
  })

// const Container = styled(Box)({})