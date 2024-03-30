import "./App.css";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import AllData from "./components/AllData";
import NavigationBar from "./components/NavBar";
import { UserDataProvider, useUserData } from "./UserDataContext";
import Login from "./components/Login";
import { useEffect } from "react";

function App() {
  const dataObj = useUserData()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    fetch('http://localhost:3000/users/profile',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res)=>res.json())
    .then(data=>{
      dataObj.addUserData(data.user)
      data.setIsLoggedIn(true)
    })
  },[dataObj, token])
  return (
    <UserDataProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/all-data" element={<AllData />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserDataProvider>
  );
}

export default App;
