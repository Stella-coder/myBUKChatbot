import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import { Button, Input } from "antd"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import React, { useState } from "react"
import app from "../../base"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import img from "../1.png"

const auth = getAuth(app);
const firestore = getFirestore(app);
const AddMediator = ()=>{
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState(img)
    const [avatar, setAvatar] = useState("")
    const [percent, setPercent] = useState("")


    const signUp = async () => {
        const newData = {
            name,
            role,
            email,
            password,
            avatar
           
        }
        const saveUser =  // Create a new user with email and password
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Handle successful sign-up
            const user = userCredential.user;
            console.log('Sign-up successful:', user);
            if (user) {
                const docRef = collection(firestore, 'users');
                          addDoc(docRef, newData);
                          console.log('Data updated successfully');
                          alert('Updated successfully');
            
              setName("");
              setRole("");
              setEmail("");
              setPassword("");
              
            }
            alert("user sucessfully created")
        })
        console.log(saveUser, "users")
       
    
       
      };


      // upload image
      const storage = getStorage();
      const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const save = URL.createObjectURL(file);
          setImage(save);
      
          const fileRef = ref(storage, "userAvatar/" + file.name);
      
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
    return(
        <Container>
            <Wrapper>
                <Wrap>
                    <div style={{fontSize:"25px", fontWeight:"bold", fontFamily:"Montserrat"}}>
                Add Mediator
                </div>
                <Holder>
                <ImageHolder>
                <Image src={image}/>
                </ImageHolder> 
                <HoldLabel>
              <Input type="file" id="up" onChange={uploadImage}/>
              </HoldLabel>
              <Label htmlFor="up">Upload passport</Label>
                    <Input
                    placeholder="Enter Mediator full name"
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                    />
                    <Input
                    placeholder="Enter Role"
                    value={role}
                    onChange={(e)=>{
                        setRole(e.target.value)
                    }}
                    />
                    <Input
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    />
                    <Input
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    />
                    <Button onClick={signUp} style={{backgroundColor:"blue"}}>Register Mediator</Button>
                </Holder>
                </Wrap>
            </Wrapper>
        </Container>
    )
}

export default AddMediator

const Container = styled(Box)({
    display:"flex",
    justifyContent:"flex-end",
    alignItems:"center",
    width:"100%",
    minHeight:"100vh",
    backgroundColor:"lavender",
   

})
const Wrapper = styled(Box)({
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"80%",
    height:"100%",
    

})
const Wrap = styled(Box)({
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    width:"80%",
    height:"450px",
    background:"rgba(255,255,255,0.2)",
boxShadow: "0px 3px 8px ",
flexDirection:"column",
borderRadius:"5px",

})
const Holder = styled(Box)({
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    width:"90%",
    flexDirection:"column",
    height:"100%"
})
const ImageHolder = styled(Box)({
    display:"flex",
    width:"100%",
    height:"150px",
    justifyContent:"center"
})
const Image = styled("img")({
    display:"flex",
    height:"100p0",
    width:"150px",
    backgroundColor:"white",
    borderRadius:"50%",
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
    color:"white",
    "&:hover": {
      transform: "scale(0.94)",
    }
  })
// const Container = styled(Box)({})