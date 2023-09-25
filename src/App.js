
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom"

import LoginPage from "./components/login/LoginPage";
import React from "react"
import HomePage from "./components/Homepage/Homepage";
import SubmitComplain from "./components/login/RegisterComplain";
import Message from "./components/Homepage/Message";
import SideBar from "./components/dashboard/SideBar";
import AddMediator from "./components/dashboard/AddMediator";
import Dashboard from "./components/dashboard/Dashboard";
import Appointments from "./components/dashboard/Appointments";
import Complains from "./components/dashboard/Complains";
import Footer from "./components/Homepage/Footer";


function App() {
  return (
    <Router>
      {/* <SideBar/> */}
      <div>
      <Routes>
        <Route path= "/" Component={HomePage} />
        {/* <Route path= "/chatbot" Component={Chabot} /> */}
       
        {/* <Route path = "/create" Component={CreateIntent} /> */}
        {/* <Route path = "/edit/:id" Component={EditIntent} /> */}
        {/* <Route path = "/login" Component={LoginPage} /> */}
        
        <Route path="/login" Component={LoginPage} />
        <Route path="/message" Component={Message} />
      
        
        <Route path="/register" Component={SubmitComplain} />
        
      </Routes>
      </div>
      <div>
     <SideBar/>
     <Routes>
     <Route path="/dash" Component={Dashboard} />
     <Route path="/add" Component={AddMediator} />
     <Route path="/appointments" Component={Appointments} />
     <Route path="/complains" Component={Complains} />
     
      </Routes>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
