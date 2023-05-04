import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect, useLocation } from 'react';
import LandingPage from "./pages/LandingPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboards from "./pages/Dashboards";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {

  // Keep track of if user is Logged in or not
  const [loggedIn, setIsLoggedIn] = useState(false);
  
  

  // Keep track of the user
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [details, setDetails] = useState([])

  // Keep track of user role
  const [role, setRole] = useState(null);

  const location = useLocation

 
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, []);


  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    localStorage.setItem("user", userData.token);
    localStorage.setItem("data", userData.user);
    console.log(userData.user)
    console.log(loggedIn)
    setDetails(userData.user)
    setUser(userData.token)
  };

  // useEffect(() => {
  //   // auto-login user
  //   fetch("http://localhost:3000/me")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Update the state with the response data
  //       console.log(data);
  //       setUser(data);
  //       setRole(data.role)
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   // auto-login user
  //   fetch("http://localhost:3000/me")
  //     .then((response) => {
  //       console.log("Response status:", response.status);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("User data:", data);
  //       setUser(data);
  //       setRole(data.role);
  //     })
  //     .catch((err) => console.log("Error:", err));
  // }, []);


  const handleLogout = () => {
    setIsLoggedIn(false);
    // handle successful logout
    
    setUser(null); // set user state to null
    localStorage.removeItem("user")
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login handleLogin={handleLogin} />}></Route>
        <Route path="/signup" element={<Signup handleLogin={handleLogin} />}></Route>
        <Route element={<PrivateRoutes loggedIn={loggedIn} />}>
          <Route path="/dashboard" element={<Dashboards user={user} details = {setDetails} handleLogout={handleLogout} />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
