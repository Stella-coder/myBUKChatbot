
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom"
import CreateIntent from "./components/admin/CreateIntent";
import Dashboard from "./components/admin/Dashboard";
import LoginPage from "./components/admin/LoginPage";
import Chabot from "./components/admin/userPage/Chatbot";
import Footer from "./components/admin/userPage/Footer";
import HomePage from "./components/admin/userPage/HomePage";
import Header from './components/Header';
import React from "react"
import EditIntent from "./components/admin/EditIntent";
import PrivateRoute from "./components/admin/PrivateRoute";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path= "/" Component={HomePage} />
        <Route path= "/chatbot" Component={Chabot} />
       
        <Route path = "/create" Component={CreateIntent} />
        <Route path = "/edit" Component={EditIntent} />
        <Route path = "/login" Component={LoginPage} />
        <Route path="/dashboard" Component={Dashboard} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
