import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar.js";

import PublicView from "./pages/PublicView/PublicView.jsx";
import Home from "./pages/Home/Home.jsx";
import Reports from "./pages/Reports/Reports.js";
import AddStaffDetails from "./pages/AddStaffDetails/AddStaffDetails.jsx";
import NewAcademicYear from "./pages/NewAcademicYear/NewAcademicYear.js";
import CreateCommittee from "./pages/CreateCommittee/CreateCommittee.js";
import EditCommittee from "./pages/EditCommittee/EditCommittee.js";
import Login from "./pages/LoginForm/Login.jsx";
import Resetpass from "./pages/ResetPass/Reset.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <BrowserRouter>
      <Navbar auth={{ isLoggedIn, setIsLoggedIn }} />


        <Routes>
          <Route
            path="/"
            element={
              <div className="login-container">
                 <Login setIsLoggedIn={setIsLoggedIn} />
              </div>
            }
          />

          <Route
            path="/resetpassword"
            element={
              <div className="login-container">
                <Resetpass />
              </div>
            }
          />

          <Route path="/publicview" Component={PublicView} />

          <Route path="/home" Component={Home} />

          <Route path="/reports" Component={Reports} />

          <Route path="/addstaff" Component={AddStaffDetails} />

          <Route path="/newacademicyear" Component={NewAcademicYear} />

          <Route path="/createcommittee" Component={CreateCommittee} />

          <Route path="/editcommittee" Component={EditCommittee} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
