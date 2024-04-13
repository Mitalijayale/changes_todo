import React from 'react'
import "./CommitteeSelector.css";

const Designations = [
  {id: "1",designation:"Elevate Head"},
  {id: "2",designation:"Elevate Volunteer"},
  {id: "3",designation:"PDA Head"},
  {id: "4",designation:"PDA Volunteer"}, 
  {id: "5",designation:"INC Head"},
  {id: "6",designation:"INC Volunteer"},
];

const CommitteeSelector = () => {
  return (
    <div id="committeeSelector">
        <select >
        <option hidden>{"Selected committee name"}</option>
        {Designations.map(ref=>(
          <option key={ref.id} value={ref.designation}>{ref.designation}</option>
        ))}
      </select>
      <button>Edit</button>
    </div> 
  )
}

export default CommitteeSelector;
