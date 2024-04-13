import React, { useEffect, useState } from "react";
import AcademicYearSelection from "../../components/AcademicYearSelection/AcademicYearSelection.jsx";
import CreateCommitteeForm from "../../components/CreateCommitteeForm/CreateCommitteeForm.jsx";
import "./CreateCommittee.css";

export default function CreateCommittee() {
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

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div>
    <div className="header-container">
      {screenSize === "large" && (
        <h3 className="mainText">Create new committee for Academic Year : year - year + 1</h3>
      )}
      {screenSize === "small" && (
        <h5 className="mainText">Create new committee for Academic Year : year - year + 1</h5>
      )}
      {screenSize === "medium" && (
        <h4 className="mainText">Create new committee for Academic Year : year - year + 1</h4>
      )}
      </div>
      <CreateCommitteeForm showLastUpdated={false} />
    </div>
  );
}
