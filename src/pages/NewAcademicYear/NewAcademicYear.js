import React, { useState } from "react";
import AcademicYearSelection from "../../components/AcademicYearSelection/AcademicYearSelection.jsx";
import AddNewAcademicYear from "../../components/AddNewAcademicYear/AddNewAcademicYear.jsx";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./NewAcademicYear.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NewAcademicYear() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  return (
    <div className="container-lg">
      <div className="row header-container mt-4 g-2">
        <div className="col-sm-12 col-md-3">
          <AcademicYearSelection
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
          />
        </div>
        <div className="col-sm-12 col-md-9 mt-2">
          <Searchbar placeholder={"Search Committees"} name={"New +"} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <AddNewAcademicYear />
        </div>
      </div>
    </div>
  );
}
