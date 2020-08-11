import React from "react";

const CourseDetails = (props) => {
  return (
    <div className="ui center aligned header sixteen wide column">
      <p>{props.course}</p>
      <p>{props.course.instructor && `Ran by: ${props.course.instructor}`}</p>
      <p>{props.course.semester && `During: ${props.course.semester}`}</p>
    </div>
  );
};

// This makes it so, when no course is passed
// CourseDetails will still get a course, but it will be an empty object.
CourseDetails.defaultProps = {
  course: {
    name: "No course selected.",
  },
};

export default CourseDetails;
