import React, { useState } from "react";
import "./StaffInfoRow.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function StaffInfoRow(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: props.name,
    education: props.education,
    social: props.social,
    //photo: null, // Add photo field here
    //linkedin: null, // Add linkedin field here
  });

  const [showCustomToast, setShowCustomToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const deleteStaff = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      axios
        .delete(
          `https://pict-inhouse-backend.onrender.com/api/staffs/delete/${id}`
        )
        .then(() => {
          setToastMessage("Staff member deleted successfully!");
          setShowCustomToast(true);
          setTimeout(() => setShowCustomToast(false), 3000);
        })
        .catch((error) => {
          console.error("Error deleting staff member:", error);
          setToastMessage("Failed to delete staff member!");
          setShowCustomToast(true);
          setTimeout(() => setShowCustomToast(false), 3000);
        });
    } else {
      setToastMessage("Deletion canceled!");
      setShowCustomToast(true);
      setTimeout(() => setShowCustomToast(false), 3000);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editedData.name || !editedData.education) {
      setToastMessage("Name and Education fields are required.");
      setShowCustomToast(true);
      setTimeout(() => setShowCustomToast(false), 3000);
      return;
    }
  
    // Check if a staff with the same name already exists
    const isStaffExists = props.staffInfo.some(staff => staff.name.toLowerCase() === editedData.name.toLowerCase());
    if (isStaffExists) {
      setToastMessage("Staff with the same name already exists.");
      setShowCustomToast(true);
      setTimeout(() => setShowCustomToast(false), 3000);
      return;
    }
  
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this staff's information?"
    );
  
    if (confirmUpdate) {
      const updatedData = {
        name: editedData.name,
        degree: editedData.education,
        //photo: "pc path",// editedData.photo, //Include photo field
        linkedin: editedData.social,
      };
  
      axios
        .put(
          `https://pict-inhouse-backend.onrender.com/api/staffs/update/${props.id}`,
          updatedData
        )
        .then(() => {
          setToastMessage("Staff member information updated successfully!");
          setShowCustomToast(true);
          setTimeout(() => setShowCustomToast(false), 3000);
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Error updating staff member:", error);
          setToastMessage("Failed to update staff member information!");
          setShowCustomToast(true);
          setTimeout(() => setShowCustomToast(false), 3000);
        });
    } else {
      setToastMessage("Update canceled!");
      setShowCustomToast(true);
      setTimeout(() => setShowCustomToast(false), 3000);
    }
  };
  

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <>
      {showCustomToast && (
        <div
          className="toast align-items-center show position-fixed top-0 end-0 mt-5 me-5"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Toast Notification</strong>
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

      <tr className="staffRow">
        <td className="img-col">
          {isEditing ? (
            <div className="facultyImageAdd">
              <input
                type="file"
                id="fileInput"
                className="input-hidden"
                accept=".png, .jpg, .jpeg"
                onChange={(e) =>
                  setEditedData({ ...editedData, photo: e.target.files[0] })
                }
              />
              <label htmlFor="fileInput">
                <span className="uploadIconContainer">
                  Image
                  <UploadIcon id="uploadImgIcon" sx={{ fontSize: 20 }} />
                </span>
              </label>
            </div>
          ) : (
            <img src={props.img} alt={`${props.name}-Photo`} />
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleChange}
              className="editInput"
            />
          ) : (
            props.name
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              type="text"
              name="education"
              value={editedData.education}
              onChange={handleChange}
              className="editInput"
            />
          ) : (
            props.education
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              type="text"
              name="social"
              value={editedData.social}
              onChange={handleChange}
              className="editInput"
            />
          ) : (
            <a href={props.social}>
              <LinkedInIcon id="LinkedInLogo" sx={{ fontSize: 48 }} />
            </a>
          )}
        </td>
        <td className="actions-row">
          {isEditing ? (
            <>
              <button className="svBtn btn btn-success ml-2 px-3" onClick={handleSave}>
                Save
              </button>
              <button className="cancBtn btn btn-danger ml-3 px-2" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
            <button className="edBtn btn btn-primary px-2" style={{fontSize:16}} onClick={handleEdit}>
              Edit <EditIcon className="editIcon" sx={{ fontSize: 19 }} />
            </button>
            <button
              className="delBtn btn btn-danger px-1"
              onClick={() => deleteStaff(props.id)}
            >
              Delete <DeleteIcon className="deleteIcon" style={{fontSize:16}} sx={{ fontSize: 19 }} />
            </button>
            </>
          )}
        </td>
      </tr>
    </>
  );
}

export default StaffInfoRow;
