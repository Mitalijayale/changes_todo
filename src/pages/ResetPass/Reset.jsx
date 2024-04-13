import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/collegeLogo.jpg";
import style from "./Reset.module.css";
import { Link } from "react-router-dom";

function Reset() {
  const [showNoDataMsg, setShowNoDataMsg] = useState(false);
  const [showInvalidDataMsg, setShowInvalidDataMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  function showMessage(e) {
    e.preventDefault();
    const username = e.target.elements.username.value;
    if (username.trim() === "") {
      setShowNoDataMsg(true);
      setTimeout(() => setShowNoDataMsg(false), 3000);
    } else if (username === "admin") {
      setShowSuccessMsg(true);
      setTimeout(() => setShowSuccessMsg(false), 4000);
    } else {
      setShowInvalidDataMsg(true);
      setTimeout(() => setShowInvalidDataMsg(false), 3000);
      e.target.reset();
    }
  }

  return (
    <div className={style.container}>
      <img src={logo} alt="Logo" className={style.logo} />
      <h3 className={style.textType}>PICT COMMITTEES</h3>
      <p className={style.infoMsg}>
        Enter your username to receive password reset link on your registered
        email address.
      </p>

      {/* Alert for empty fields */}
      {showNoDataMsg && (
        <div className="alert alert-warning" role="alert">
          Please enter your username.
        </div>
      )}

      {/* Alert for invalid credentials */}
      {showInvalidDataMsg && (
        <div className="alert alert-danger" role="alert">
          Username not found.
        </div>
      )}

      {/* Alert for invalid credentials */}
      {showSuccessMsg && (
        <div className="alert alert-success" role="alert">
          Password reset link sent on your registered email address.
        </div>
      )}

      <form onSubmit={showMessage}>
        <div className={style.formGroup}>
          <div className={style.inputcontainer}>
            <label className={style.username}>Username</label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="mb-3">
            <Link to="/" className={style.forgetPass}>
              Back to Login
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
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Reset;
