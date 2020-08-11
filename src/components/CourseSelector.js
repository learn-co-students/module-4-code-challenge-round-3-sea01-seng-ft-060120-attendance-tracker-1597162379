import React from "react";

const CourseSelector = (props) => {
  return (
    <div className="sixteen wide column">
      <select
        className="ui dropdown"
        onChange={props.handleCourseClick}
        defaultValue="select"
      >
        {/* you shouldn't need to touch these options below */}
        <option value="select" disabled>
          Select a course
        </option>
        {props.courses.map((course) => {
          return (
            <option key={course.id} className="item" value={course.name}>
              {course.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

// This makes it so, when no courses are passed
// CourseDetails will still get courses, but it will be an empty array.
CourseSelector.defaultProps = {
  courses: [],
};

export default CourseSelector;
