import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "./AddNewAcademicYear.css";

export default function AddNewAcademicYear() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="noCommittees text-center">
            <h1>No committees added for academic year 2023-2024</h1>
            <h3>
              Create one by clicking on "New &gt; Committee" or by
              simply copying all the last year committee data
            </h3>
            <button className="btn btn-primary btn-lg"> 
              Copy last year committees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

