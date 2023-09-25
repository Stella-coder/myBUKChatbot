import React, { useState } from "react";
import {styled} from "@mui/styles";
import img1 from "assets/1.jpg";
import { Button, Input } from "antd";
import app  from "../../base";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import OrderDetails from "pages/OrderDetails"
import 'firebase/compat/storage'
// import 'firebase/compat/auth'

// import { getStorage } from "firebase/storage";
// const storage = getStorage(app);

const SignPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(img1);
  const [avatar, setAvatar] = useState("");
  const [percent, setPercent] = useState(0);
  const [show, setShow] = useState(true);
  const toggle = () => {
    setShow(!show);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);

    const fileRef = await app.storage().ref();
    const storeRef = fileRef.child("avatar/" + file.name).put(file);

    storeRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapShot) => {
        const counter = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

        setPercent(counter);
        console.log(counter);
      },
      (err) => console.log(err.message),
      () => {
        storeRef.snapshot.ref.getDownloadURL().then((URL) => {
          setAvatar(URL);
          console.log(URL);
        });
      }
    );
  };

  const signUp = async () => {
    const saveUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (saveUser) {
      await app.firestore().collection("users").doc(saveUser.user.uid).set({
        avatar,
        name,
        email,
        password,
        createdBy: saveUser.user.uid,
      });
      setName("");
      setEmail("");
      setPassword("");
      navigate("/register");
    }
  };

 

  const Login = async () => {
    const saveUser = await app
      .auth()
      .signInWithEmailAndPassword(email, password);

    navigate("/");
  };

  return (
    
    <Container>
      {show ? (
        <Wrapper>
          <CardHolder>
            <HoldLabel>
              <Input type="file" id="up" onChange={uploadImage} />
            </HoldLabel>
            <Label htmlFor="up">Upload Image</Label>
            <Input
             style={{margin:"10px"}}
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
             style={{margin:"10px"}}
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
             style={{margin:"10px"}}
              placeholder="Enter your Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Input
             style={{margin:"10px"}}
              placeholder="Enter your Address"
              
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <Label onClick={signUp}>Sign Up</Label>
            
           
            <Text>
              Already have an account? <div onClick={toggle}>Log in</div>
            </Text>
          </CardHolder>
          <Image src={image} />
        </Wrapper>
      ) : (
        <Wrapper>
          <CardHolder>
            <Input
             style={{margin:"10px"}}
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
             style={{margin:"10px"}}
              placeholder="Enter your Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Label onClick={signUp}>Log In</Label>

            <Text>
              Don't have an account? <div onClick={toggle}>Sign Up</div>
            </Text>
          </CardHolder>
          <h1>Login</h1>
        </Wrapper>
      )}
      <OrderDetails/>
    </Container>
  );
};

export default SignPage;

const Container = styled("div")({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "80px",
  zIndex: -1,
  backgroundColor:"black",
  flexDirection:"column"
})
const Wrapper = styled("div")({
  width: "700px",
  height: "500px",
  background: "rgba(255, 255, 255, 0.25)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(4px)",
  webkitBackdropFilter: "blur(4px)",
  borderRadius: "10px",
  border:"1px solid rgba(255, 255, 255, 0.18)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "20px",
 "@media screen and (max-width:768px)": {
    width: "300px",
    height: "100%",
    minHeight: "500px",
    flexWrap: "wrap",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
   
    "h1": {
      color: "black",
    }
  },
  "@media screen and (min-width: 768px)" :{
    "h1": {
      display: "none",
    }
  }
})

const Image = styled("img")({
  height: "50%",
  width: "50%",
  /* margin: 10px 10px; */
  borderRadius: "10px",
  border: "1px solid #004080",
   "@media screen and (max-width: 768px)": {
    borderRadius: "50%",
    height: "150px",
    width: "150px",
  }
})
const CardHolder = styled("div")(({clr})=>({
  width: "280px",
  display: "flex",
  margin: "0px 10px",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  flexDirection: "column",
  "input": {
    margin: "10px 0px",
  },
  "button" :{
    width: "100%",
    backgroundColor: clr ? "blue" : "#004080",
  },
  "div": {
    fontWeight: "bold",
    margin: "5px 0px",
  },

}))

const HoldLabel = styled("div")({
  display: "none",
})

const Label = styled("label")({
  /* padding: 10px;
  background-color: #004080;
  border-radius: 20px;
  color: #da9393;
  font-weight: bold;
  margin: 5px 0px; */
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  height: "34px",
  width: "100%",
  backgroundColor: "#94a7ae",
  border: "none",
  borderRadius: "5px",
  color: "#fff",
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

const Text = styled("div")({
  margin:" 5px 0px",
  alignItems: "center",
  display: "flex",
  "div": {
    marginLeft: "5px",
    color: "#64766a",
    cursor: "pointer",
    fontWeight: "bold",
  }
})