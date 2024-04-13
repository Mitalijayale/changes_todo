import React, { useEffect, useState } from "react";
import StaffInfoRow from "../../components/StaffInfoRow/StaffInfoRow.jsx";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import "./AddStaffDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function StaffDetails() {
  const [showAddFaculty, setShowAddFaculty] = useState(false);
  const toggleAddFaculty = () => {
    setShowAddFaculty(!showAddFaculty);
  };

  const [staffInfo, setStaffInfo] = useState([]);
  const [newStaffData, setNewStaffData] = useState({
    name: "",
    degree: "",
    linkedin: "",
    photo: "",
  });

  const [showCustomToast, setShowCustomToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://pict-inhouse-backend.onrender.com/api/staffs")
      .then((res) => {
        setStaffInfo(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
      });
  }, []);

  const addNewStaff = () => {
    if (!newStaffData.name || !newStaffData.degree || !newStaffData.linkedin || !newStaffData.photo) {
      setToastMessage("Please fill in all fields.");
      setShowCustomToast(true);
      setTimeout(() => setShowCustomToast(false), 3000);
      return;
    }
  
    // Check if a staff with the same name already exists
    const isStaffExists = staffInfo.some(staff => staff.name.toLowerCase() === newStaffData.name.toLowerCase());
    if (isStaffExists) {
      setToastMessage("Staff with the same name already exists.");
      setShowCustomToast(true);
      setTimeout(() => setShowCustomToast(false), 3000);
      return;
    }
  
    const staffData = {
      name: newStaffData.name,
      degree: newStaffData.degree,
      photo: newStaffData.photo,
      linkedin: newStaffData.linkedin,
    };
  
    axios
      .post("https://pict-inhouse-backend.onrender.com/api/staffs/add", staffData)
      .then((res) => {
        console.log("Staff added successfully:", res.data);
        // Clear the input fields
        setNewStaffData({
          name: "",
          degree: "",
          linkedin: "",
          photo: "",
        });
        // Close the add faculty section
        toggleAddFaculty();
        // Update staffInfo to trigger re-rendering
        setStaffInfo((prevStaffInfo) => [...prevStaffInfo, res.data]);
        setToastMessage("Staff added successfully.");
        setShowCustomToast(true);
        setTimeout(() => setShowCustomToast(false), 3000);
      })
      .catch((error) => {
        console.error("Error adding new staff:", error);
        setToastMessage("Failed to add new staff.");
        setShowCustomToast(true);
        setTimeout(() => setShowCustomToast(false), 3000);
        console.log(staffData.photo);
      });
  };
  

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive search
    axios
      .get("https://pict-inhouse-backend.onrender.com/api/staffs")
      .then((res) => {
        const allStaff = res.data.data;
        if (!searchTerm) {
          // If search term is empty, display all staff members
          setStaffInfo(allStaff);
        } else {
          // Filter staff members whose name matches the search term
          const matchingStaff = allStaff.filter(staff => staff.name.toLowerCase().includes(searchTerm));
          setStaffInfo(matchingStaff);
        }
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
      });
  };
  

  return (
    <div className="container">
      <div className="staff-title">
        <div className="blank-bar" />
        <h3>Staff Details</h3>
      </div>
      <div id="searchStaffRow">
        <div className="searchStaff">
          <input type="text" placeholder="Search Staff" onChange={handleSearchInputChange} />
          <SearchIcon className="searchIcon" />
        </div>
        <button className="addStaffBtn btn btn-primary ml-2" style={{ backgroundColor: "#1e90ff", color: "#fff" }} onClick={toggleAddFaculty}>
          New Staff +
        </button>
      </div>

      <div className={`addFaculty ${showAddFaculty ? "open" : ""}`}>
        <div className="facultyImageAdd">
          <input
            type="file"
            id="fileInput"
            className="input-hidden"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => setNewStaffData({ ...newStaffData, photo: e.target.files[0] })}
          />
          <label htmlFor="fileInput" className="image-input-label">
          <span className="uploadIconContainer">
            Image
            <UploadIcon id="uploadImgIcon" sx={{ fontSize: 20 }} />
          </span>
          </label>
        </div>
        <input
          type="text"
          className="facultyNameAdd"
          placeholder="Enter faculty name"
          value={newStaffData.name}
          onChange={(e) => setNewStaffData({ ...newStaffData, name: e.target.value })}
        />
        <input
          type="text"
          className="facultyEducationAdd"
          placeholder="Enter faculty education"
          value={newStaffData.degree}
          onChange={(e) => setNewStaffData({ ...newStaffData, degree: e.target.value })}
        />
        <input
          type="text"
          className="facultySocialAdd"
          placeholder="social link"
          value={newStaffData.linkedin}
          onChange={(e) => setNewStaffData({ ...newStaffData, linkedin: e.target.value })}
        />
        <button className="saveAddBtn btn btn-success ml-2 px-4" onClick={addNewStaff}>
          Save
        </button>
        <button className="cancelAddBtn btn btn-danger ml-2 px-3" onClick={toggleAddFaculty}>
          Cancel
        </button>
      </div>

      {showCustomToast && (
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
              onClick={() => setShowCustomToast(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{toastMessage}</div>
        </div>
      )}

      {staffInfo.length > 0 ? (
        <div className="table_section">
        <table className="staff-table">
          <thead className="table-thead">
            <tr className="columnHeading">
              <th ></th>
              <th >Faculty Name</th>
              <th >Education</th>
              <th >LinkedIn</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffInfo.map((staffMember) => (
              <StaffInfoRow
                id={staffMember._id}
                key={staffMember._id}
                img={staffMember.photo}
                name={staffMember.name}
                education={staffMember.degree}
                social={staffMember.linkedin}
                staffInfo={staffInfo} // if any problem arises while updating try removing this
              />
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <div className="noRecordMessage">No Record Found !!!</div>
      )}
    </div>
  );
}

export default StaffDetails;
