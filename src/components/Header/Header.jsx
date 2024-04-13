import React from 'react';
import "./Header.css";

import img from "../../assets/collegeLogo.jpg";

function Header(){
    return (
            <div className="navbar">
            <img src={img} alt="pict-logo" />
            <div className="content">
                <h2>PICT</h2>
                <p>Committies</p>
            </div>
            <button className="logoutBtn">Logout</button>
            </div>
    );
}

export default Header;
