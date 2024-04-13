import React, { useState, useEffect, useRef } from "react";
import "./Popup.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Popup = ({ onClose, onSubmit }) => {
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(startYear) >= parseInt(endYear)) {
      alert("End year must be greater than start year.");
      return;
    }
    onSubmit(startYear, endYear);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner" ref={popupRef}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 me-3">New Academic Year</h4>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="startYear">Start Year:</label>
          <input
            type="number"
            id="startYear"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            min={new Date().getFullYear()}
            max={new Date().getFullYear() + 100}
            required
          />
          <label htmlFor="endYear">End Year:</label>
          <input
            type="number"
            id="endYear"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            min={new Date().getFullYear() + 1}
            max={new Date().getFullYear() + 101}
            required
          />
          <button type="submit" value="Submit" className="btn btn-light">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
