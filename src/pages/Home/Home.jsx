import React, { useEffect, useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AcademicYearSelection from "../../components/AcademicYearSelection/AcademicYearSelection.jsx";
import Popup from "../../components/Popup/Popup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [academicYears, setAcademicYears] = useState([
    {
      label: `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`,
      value: new Date().getFullYear(),
    },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [Committees, setCommittees] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    document.title = `Committees For Academic Year: ${selectedYear} - ${
      selectedYear + 1
    }`;

    axios
      .get("https://pict-inhouse-backend.onrender.com/api/staffs/")
      .then((res) => {
        const extractedStaffData = res.data.data.map((staff) => ({
          id: staff._id,
          name: staff.name,
        }));
        setStaffData(extractedStaffData);
      });

    axios
      .get("https://pict-inhouse-backend.onrender.com/api/comitties/")
      .then((res) => {
        setCommittees(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching committee data:", error);
      });
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    document.title = `Committees For Academic Year: ${year} - ${year + 1}`;
  };

  const handleNewYearSubmit = (startYear, endYear) => {
    const newYearLabel = `${startYear} - ${endYear}`;
    const newYearValue = startYear;

    setAcademicYears((prevYears) => [
      ...prevYears,
      { label: newYearLabel, value: newYearValue },
    ]);
    setShowPopup(false);
  };

  const handleDeleteEvent = (id) => {
    const isConfirmed = window.confirm(
      "Do you really want to delete this committee's entire information ?"
    );
    if (isConfirmed) {
      axios
        .delete(
          `https://pict-inhouse-backend.onrender.com/api/comitties/delete/${id}`
        )
        .then(() => {
          // Remove the deleted committee from the list
          setCommittees((prevCommittiees) =>
            prevCommittiees.filter((com) => com.id !== id)
          );
          // Show success toast
          setToastMessage("Committee information deleted successfully.");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        })
        .catch((error) => {
          console.error("Error deleting committee information:", error);
          // Show error toast
          setToastMessage(
            "Failed to delete committee information. Please try again later."
          );
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        });
    }
  };
  

  return (
    <>
      <div className="main--content">
        <div className="tabular--wrapper">
          <div className="container-1">
            <div className="col-sm-12 col-md-1">
              <AcademicYearSelection
                selectedYear={selectedYear}
                academicYears={academicYears}
                onYearChange={handleYearChange}
              />
            </div>
            <div>
              <button
                type="button"
                className="btn custom-button"
                onClick={() => setShowPopup(true)}
              >
                New Academic Year
              </button>
            </div>
          </div>

          <div className="container-2">
            <h5 className="main--title">
              Committees For Academic Year: {selectedYear} - {selectedYear + 1}
            </h5>
            <Link to={"/createcommittee"}>
              <button type="button" className="btn">
                New Committee
              </button>
            </Link>
          </div>

          <div className="table-responsive table--container">
            <table className="table-bordered">
              <thead>
                <tr>
                  <th className="committee-name">Committee Name</th>
                  <th className="head-of-committee">Head of Committee</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {Committees.map((com) => (
                  <tr key={com._id}>
                    <td>{com.name}</td>
                    {/* Find the member whose role is "Head" and display the staff name */}
                    <td>
                      {
                        staffData.find(
                          (staff) =>
                            staff.id ===
                            com.memberIds.find(
                              (member) => member.role === "Head"
                            )?.staffId
                        )?.name
                      }
                    </td>
                    <td className="tdrow">
                      <Link to={"/editcommittee"}>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          style={{ marginRight: "1.5rem", padding: "6px 20px" }}
                        >
                          Edit{" "}
                          <EditIcon
                            className="editIcon"
                            sx={{ fontSize: 19 }}
                          />
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteEvent(com._id)}
                        style={{ padding: "6px 18px" }}
                      >
                        Delete{" "}
                        <DeleteIcon
                          className="deleteIcon"
                          style={{ fontSize: 16 }}
                          sx={{ fontSize: 19 }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={6}>Have A Great Day</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {showToast && (
        <div
          className="toast align-items-center show position-fixed top-0 end-0 mt-5 me-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Notification</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{toastMessage}</div>
        </div>
      )}

      {showPopup && (
        <Popup
          title="Add New Academic Year"
          onClose={() => setShowPopup(false)}
          onSubmit={handleNewYearSubmit}
        />
      )}
    </>
  );
}

export default Dashboard;
