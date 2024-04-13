import React, { useEffect, useState } from "react";
import AcademicYearSelection from "../../components/AcademicYearSelection/AcademicYearSelection.jsx";
import CommitteeSelector from "../../components/CommitteeSelector/CommitteeSelector.jsx";
import CreateCommitteeForm from "../../components/CreateCommitteeForm/CreateCommitteeForm.jsx";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./EditCommittee.css";

export default function EditCommittee() {
  const [screenSize, setScreenSize] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let size = "";
      if (width >= 2560) {
        size = "large";
      } else if (width <= 1920) {
        size = "small";
      } else {
        size = "medium";
      }
      setScreenSize(size);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
    <div className="header-container">
      {screenSize === "large" && (
        <h3 className="mainText">Edit Committee Details</h3>
      )}
      {screenSize === "small" && (
        <h5 className="mainText">Edit Committee Details</h5>
      )}
      {screenSize === "medium" && (
        <h4 className="mainText">Edit Committee Details</h4>
      )}
      </div>
      <CreateCommitteeForm showLastUpdated={true} />
    </div>
  );
}
