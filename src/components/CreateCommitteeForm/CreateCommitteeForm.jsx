import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import "./CreateCommitteeForm.css";
import { Link } from "react-router-dom";
import axios from "axios";

function CreateCommitteeForm(props) {
  const LastUpdated = props.showLastUpdated;
  const [rowCount, setRowCount] = useState([]);
  const [nextRowId, setNextRowId] = useState(1);
  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [StaffInfo, setStaffInfo] = useState([]);
  const [Designations, setDesignations] = useState([]);

  useEffect(() => {
    axios.get("https://pict-inhouse-backend.onrender.com/api/staffs/")
      .then((res) => {
        setStaffInfo(res.data.data);
      }).catch((err) => {
        console.error("Failed to fetch Staff Name data, Error:", err.message);
      });

    axios.get("https://pict-inhouse-backend.onrender.com/api/comitties/")
      .then((res) => {
        const uniqueRoles = [...new Set(res.data.data.flatMap(committee => committee.memberIds.map(member => member.role)))];
        setDesignations(uniqueRoles.map(role => ({ id: role, designation: role })));
      }).catch((err) => {
        console.error("Failed to fetch committee data, Error:", err.message);
      });
  }, []);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const crem = 150 - description.length;

  const addRowMain = (event) => {
    event.preventDefault();
    setRowCount([...rowCount, nextRowId]);
    setNextRowId(nextRowId + 1);
  };

  const deleteRowMain = (id) => {
    setRowCount(rowCount.filter((rowId) => rowId !== id));
  };

  const resetAll = () => {
    setRowCount([]);
  };

  const handleSave = () => {
    // Check if any field is empty
    if (!description.trim() || rowCount.length === 0) {
      setShowToast(true);
      setToastMessage("Please fill all the input fields");
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setShowToast(true);
    setToastMessage("Committee data saved successfully");
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const isMatchFound = StaffInfo.some((staffMember) => staffMember.name.toLowerCase().includes(searchTerm));
    if (!isMatchFound) {
      setShowToast(true);
      setToastMessage("No matching staff name found, please try another name");
      setTimeout(() => setShowToast(false), 3000);
      // Clear the input field
      event.target.value = "";
    }
  };

  return (
    <div className="committee-container">
      <Form className="committeeForm">
        <div className="rowMain1">
          <div id="row1">
            <Form.Label>Name of the committee</Form.Label>
            <Form.Control type="text" placeholder="Committee name" />
          </div>
          <div id="row2">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Academic Committee" />
          </div>
        </div>

        <div id="row3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            maxLength="150"
            id="desc"
            onChange={handleDescriptionChange}
          />
          <Form.Text className="characters-remaining">
            Characters Remaining : {crem}
          </Form.Text>
        </div>

        <div id="addRow">
          <Form.Label>Members</Form.Label>
        </div>

        {rowCount.map((rowId) => (
          <div className="rowMain" key={rowId}>
            <div id="row4">
              <Form.Control list={`nameList${rowId}`} placeholder="Name" onChange={handleSearchInputChange} />
              <datalist id={`nameList${rowId}`}>
                {StaffInfo.map((staffMember) => (
                  <option key={staffMember.id} value={staffMember.name} />
                ))}
              </datalist>
            </div>

            <div id="row5">
              <Form.Control
                list={`designationList${rowId}`}
                placeholder="Designation"
              />
              <datalist id={`designationList${rowId}`}>
                {Designations.map((ref) => (
                  <option key={ref.id} value={ref.designation} />
                ))}
              </datalist>
              <Button
                className="delStaffRowBtn"
                onClick={() => deleteRowMain(rowId)}
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
        ))}

        <div id="row6">
          <Button onClick={addRowMain}>New Member</Button>
        </div>

        <div id="row8">
          <Form.Label className="Upload-Doc">Upload document if any</Form.Label>
          <div className="custom-file-input">
            <Form.Control
              type="file"
              id="fileInput"
              className="input-hidden"
              accept=".pdf"
            />
            <Form.Label htmlFor="fileInput">
              <span>
                <FolderIcon className="FolderIcon" sx={{ fontSize: 20 }} />{" "}
                Select File
              </span>
            </Form.Label>
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

        <div id="row9">
          {LastUpdated && <p>Last Edited : DD MMM YYYY HH:MM:SS</p>}
          <Button type="reset" id="btnReset" onClick={resetAll}>
            Reset
          </Button>
          <Link to={"/home"} className="LinkButton">
            <Button id="btnCancel">Cancel</Button>
          </Link>
          <Button id="btnSave" onClick={handleSave}>Save</Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateCommitteeForm;
