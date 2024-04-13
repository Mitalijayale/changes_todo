import React from "react";
import "./AcademicYearSelection.css";

const currentYear = new Date().getFullYear();
const options = [];

for (let year = currentYear; year >= 1983; year--) {
  options.push(
    <option key={year} value={year}>
      {year} - {year + 1}
    </option>
  );
}

function AcademicYearSelection({ selectedYear, onYearChange }) {
  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    onYearChange(year);
  };

  return (
    <div className="academicYear">
      <label className="ayLabel">Academic Year</label>
      <select
        className="ayDropdown"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {options}
      </select>
    </div>
  );
}

export default AcademicYearSelection;
