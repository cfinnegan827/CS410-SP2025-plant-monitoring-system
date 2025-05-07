import React from 'react'
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/Dashboard/Home"
import Environment from "./pages/Dashboard/Environment"


const App = () => {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element= {<Root />} />
            <Route path="/login" exact element= {<Login />} />
            <Route path="/signup" exact element= {<SignUp />} />
            <Route path="/dashboard" exact element= {<Home />} />
            <Route path="/environments" exact element= {<Environment />} />
          </Routes>
      </Router>
    </div>
  )
};

export default App

const Root = () => {
  // check token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // redirect to dashboard if auth, otherwise to login 
  return isAuthenticated? (
    <Navigate to="/dashbpard" /> 
  ) : (
    <Navigate to="/login" />
  )
};
