import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import { Button, Input } from "antd"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth"
import React, { useEffect, useState } from "react"
import app from "../../base"
import { addDoc, collection, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import img from "../1.png"
import { useNavigate, useParams } from "react-router-dom"

const auth = getAuth(app);
const firestore = getFirestore(app);
const EditMediator = ()=>{
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userId, setUserId] = useState("")
    const [avatar, setAvatar] = useState("")
    const [image, setImage] = useState("")
    const [percent, setPercent] = useState("")
    const nav = useNavigate()
    const {id} = useParams()



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

      const updateData = async () => {
        const newData = {
                      name,
                      role,
                      email,
                      password,
                      avatar,     
                  }
      
          try {
            if (id) {
              // If an editId exists, update the document instead of adding a new one
              const docRef = doc(firestore, 'users', id);
              updateDoc(docRef, newData);
              nav("/login")
              console.log('Data updated successfully');
              alert('Updated successfully');
            } 
          } catch (error) {
            console.error('Error submitting/updating data:', error);
          }
      };
      const user = auth.currentUser;
      console.log("user", user, email, password)
      const editUserAndData = async () => {
        try {
          // Initialize Firebase Authentication
          const auth = getAuth();
      
          // Sign in the user with their email and password
          await signInWithEmailAndPassword(auth, email, password);
      
          // Get the current user
          const user = auth.currentUser;
          console.log("user", email, password)
      
          if (user) {
            // Check if the user UID matches the provided UID
            if (user.uid === userId) {
              // Update the user's information (if needed)
              // For example, you can update the user's email or password
              await updateEmail(user, email);
              await updatePassword(user, password);
      
              // Update the user data in Firestore using the provided 'id'
              await updateData();
      
              alert(`User account and data for userId ${userId} updated successfully.`);
              console.log(`User account and data for userId ${userId} updated successfully.`);
            } else {
              console.error('Provided UID does not match the current user.');
            }
          } else {
            console.error('User is not signed in.');
          }
        } catch (error) {
          console.error('Error updating user account and data:', error);
        }
      };
    console.log(id, "id")
      useEffect(() => {
        const fetchDocument = async () => {
          try {
            const documentId = id; // Replace with the actual document ID
            const documentRef = doc(firestore, 'users', documentId);
            const documentSnapshot = await getDoc(documentRef);
    
            if (documentSnapshot.exists()) {
              const documentData = documentSnapshot.data();
              setName(documentData.name);
              setRole(documentData.role);
              setEmail(documentData.email);
              setPassword(documentData.password);
              setAvatar(documentData.avatar);
              setImage(documentData.avatar);
              setUserId(documentData.userId);
              console.log(name, role, avatar)
            } else {
              console.log('Document does not exist.');
            }
          } catch (error) {
            console.error('Error getting document:', error);
          }
        };
    
        fetchDocument();
      }, []);
      
    return(
        <Container>
            <Wrapper>
                <Wrap>
                    <div style={{fontSize:"25px", fontWeight:"bold", fontFamily:"Montserrat"}}>
                Edit Mediator
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
                    <Button onClick={editUserAndData} style={{backgroundColor:"blue"}}>Edit Mediator</Button>
                </Holder>
                </Wrap>
            </Wrapper>
        </Container>
    )
}

export default EditMediator

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