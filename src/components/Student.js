import React from "react";

const Student = (props) => (
  <tr style={{ textAlign: "center" }}>
    <td>{props.students.name}</td>
    <td>{props.students.class_year}</td>
    <td>{props.students.percentage}</td>
    <button onClick={props.handleStudentClick} value={props.students.id}>
      Absent
    </button>
    <button onClick={props.handleHere} value={props.students.id}>
      Here
    </button>
    <td>
      <input
        type="checkbox"
        checked={props.students.attending}
        // onClick={props.students.attending}
      />
    </td>
  </tr>
);

export default Student;
