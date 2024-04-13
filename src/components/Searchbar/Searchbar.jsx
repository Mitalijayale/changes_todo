import React from 'react';
import "./Searchbar.css";
import { Link } from 'react-router-dom';

const Searchbar = (props) => {
  return (
    <div className="searchbar-btn">
      <input type="text" placeholder={props.placeholder}/>
      <Link to="/createcommittee" className='NewBtnLink'>
        <button>{props.name}</button>
      </Link>
    </div>
  )
}

export default Searchbar;
