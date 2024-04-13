import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/collegeLogo.jpg";
import style from "./Login.module.css";

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [showEmptyFieldsAlert, setShowEmptyFieldsAlert] = useState(false);
  const [showInvalidDataAlert, setShowInvalidDataAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // When navigating back to the login page, set isLoggedIn to false
    if (location.pathname === "/") {
      setIsLoggedIn(false);
    }
  }, [location.pathname]); // Listen for route changes
  

  function checkLogin(e) {
    e.preventDefault();
  
    const username = e.target.elements.username.value.trim(); 
    const password = e.target.elements.password.value.trim(); 
  
    if (username === "" || password === "") {
      setShowEmptyFieldsAlert(true);
      setTimeout(() => setShowEmptyFieldsAlert(false), 3000);
    } else if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      setShowInvalidDataAlert(true);
      setTimeout(() => setShowInvalidDataAlert(false), 3000);
      e.target.reset();
    }
  }
  

  return (
    <div className={style.container}>
      <img src={logo} alt="Logo" className={style.logo} />
      <h3 className={style.textType}>PICT COMMITTEES</h3>
      <p className={style.infoMsg}>Login to manage the committees</p>

      {/* Alert for empty fields */}
      {showEmptyFieldsAlert && (
        <div className="alert alert-warning" role="alert">
          Please enter both username and password.
        </div>
      )}

      {/* Alert for invalid credentials */}
      {showInvalidDataAlert && (
        <div className="alert alert-danger" role="alert">
          Incorrect username or password.
        </div>
      )}

      <form onSubmit={checkLogin}>
        <div className={style.formGroup}>
          <div className={style.inputcontainer}>
            <label className={style.username}>Username</label>
            <input type="text" className="form-control" name="username" />
          </div>
          <div className={style.inputcontainer}>
            <label className={style.password}>Password</label>
            <input type="password" className="form-control" name="password" />
          </div>
          <div className="mb-3">
            <Link to="/resetpassword" className={style.forgetPass}>
              Forgot Password ?
            </Link>
          </div>
          <div className="d-grid gap-2">
          <button
              className="btn btn-primary"
              type="submit"
              style={{
                backgroundColor: "#1e90ff",
                transition: "background-color 0.3s", 
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1973cc")} 
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e90ff")} 
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
