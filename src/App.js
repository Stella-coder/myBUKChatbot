
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
import Complains from "./components/dashboard/Complains";
import Footer from "./components/Homepage/Footer";
import EditMediator from "./components/dashboard/EditMediator";


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
     <Route path="/dashboard" Component={Dashboard} />
     <Route path="/add" Component={AddMediator} />
     <Route path="/edit/:id" Component={EditMediator} />
     <Route path="/complains" Component={Complains} />
     
      </Routes>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
