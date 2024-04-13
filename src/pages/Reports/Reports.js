import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reports.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AcademicYearSelection from "../../components/AcademicYearSelection/AcademicYearSelection";
import { useState } from "react";

function Reports() {
  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "portrait" });

    doc.autoTable({
      html: "#my-table",
    });

    doc.save("Commitees.pdf");
  };

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Define your committees data
  const committeesData = [
    {
      name: "PDA",
      members: ["Member 1", "Member 2", "Member 3"],
    },
    {
      name: "NAAC",
      members: ["Member 1", "Member 2", "Member 3", "Member 4"],
    },
    {
      name: "SPPU",
      members: ["Member 1", "Member 2", "Member 3", "Member 4"],
    },
    {
      name: "SPPU",
      members: ["Member 1", "Member 2", "Member 3", "Member 4"],
    },
    {
      name: "SPPU",
      members: ["Member 1", "Member 4"],
    },
    {
      name: "SPPU",
      members: ["Member 1", "Member 2", "Member 3", "Member 4"],
    },
    {
      name: "SPPU",
      members: ["Member 1", "Member 2", "Member 3", "Member 4"],
    },
  ];

  return (
    <>
      {useEffect(() => {
        document.title = "Reports";
      })}
      <div>
        <div className="container-lg mt-4">
          <h4>Generate Report</h4>
          <div className="row g-2">
            {/* Academic Year Dropdown */}
            <div className="row m-2">
              <div className="col-md-1">
                <AcademicYearSelection
                  selectedYear={selectedYear}
                  onYearChange={handleYearChange}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table
                className="table table-striped table-bordered caption-top"
                id="my-table"
              >
                <caption>List of Committees</caption>
                <thead className="table-stripeds">
                  <tr>
                    <th scope="col" width="5%">
                      Sr No.
                    </th>
                    <th scope="col" width="50%">
                      Committees Names
                    </th>
                    <th scope="col" width="30%">
                      Members Name
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divider table-striped">
                  {committeesData.map((committee, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <th scope="row" rowSpan={committee.members.length}>
                          {index + 1}
                        </th>
                        <td scope="row" rowSpan={committee.members.length}>
                          {committee.name}
                        </td>
                        <td scope="row">{committee.members[0]}</td>
                      </tr>
                      {committee.members.slice(1).map((member, i) => (
                        <tr key={i}>
                          <td>{member}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
                <tfoot className="table-group-divider">
                  <tr>
                    <td colSpan="3">Copyright of PICT</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div
              className="d-grid gap-2 col-2 mx-auto"
              style={{ paddingBottom: "1.5rem" }}
            >
              <button
                className="btn btn-danger btn-primary btn-md "
                onClick={exportPdf}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;
