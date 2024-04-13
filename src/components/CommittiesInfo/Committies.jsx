import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Committies.module.css";
import Members from "./Members";
import AcademicYearSelection from "../MiniComponents/AcademicYearSelection/AcademicYearSelection";

function Committies() {
  // Assuming you have an array of academic years

  const commities = [
    "PDA",
    "Seminar",
    "Interview" /* Add more committees as needed */,
  ];

  return (
    <>
      <div className={style.position}>
        <div className={style.row}>
          <div className={style.acde}>
            <AcademicYearSelection></AcademicYearSelection>
          </div>
          <div className={style.fullWidthContainer}>
            <div className={style.row}>
              <div
                className={`${style.dropdown1} ${style.increasedHeight}`}
                style={{ height: "50px" }}
              >
                <select
                  className={`${style.select} form-select ${style.increasedHeight}`}
                  aria-label="Default select example"
                >
                  <option value="" disabled selected>
                    Committees
                  </option>
                  {commities.map((commitie) => (
                    <option key={commitie} value={commitie}>
                      {commitie}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Members />
    </>
  );
}

export default Committies;
