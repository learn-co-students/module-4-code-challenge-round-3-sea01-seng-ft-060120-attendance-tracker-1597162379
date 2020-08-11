import React, { Component } from "react";
import CourseDetails from "./CourseDetails";
import CourseSelector from "./CourseSelector";
import StudentsList from "./StudentsList";

class CourseContainer extends Component {
  state = {
    courseList: [],
    selectedCourse: [],
    allStudents: [],
    attendingStudents: [],
    absentStudents: [],
    selectedStudentAttendance: [],
  };

  componentDidMount = () => {
    fetch(`http://localhost:6001/courses`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          courseList: data,
        });
        console.log(data);
      });

    fetch(`http://localhost:6001/students`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          allStudents: data,
        });
        console.log(data);
      });
  };

  handleHere = (e) => {
    // working to update the state so the checkbox updates immediately
    // the patch aspect of the app works, working on getting access to frontend thru state
    var studentId = e.target.value;
    console.log(this.state.attendingStudents);
    let selectedStudent;
    this.state.attendingStudents.map((student) => {
      if (student.id == studentId) {
        console.log(student);
        selectedStudent = student;
      }
    });

    //eventually I want to take the id of the corresponding student object in my state and
    // I want to setState so that whatever the attending boolean is set to the opposite

    console.log(selectedStudent);

    this.setState({
      selectedStudentAttendance: true,
    });

    fetch(`http://localhost:6001/students/${studentId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        attending: true,
      }),
    });
  };

  handleStudentClick = (e) => {
    console.log(e.target.value);
    var studentId = e.target.value;

    fetch(`http://localhost:6001/students/${studentId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        attending: false,
      }),
    });
  };

  // updateStudentAttendance(id, data) {
  //   return fetch(`http://localhost:6001/students`)
  //   method: 'PUT',
  // }

  handleCourseClick = (e) => {
    //map over students and render the names of students whose student.course == course.name
    console.log(e.target.value);
    this.setState({ selectedCourse: e.target.value });
    let selectedStudents = this.state.allStudents.map((student) => {
      if (student.course === e.target.value) {
        let newStudent = student;
        return newStudent;
        // this.setState({
        //   attendingStudents: [...this.state.attendingStudents, newStudent],
        // });
      }
    });

    var data = selectedStudents.filter(function (element) {
      return element !== undefined;
    });
    console.log(data);

    this.setState({
      attendingStudents: data,
    });
  };

  render() {
    return (
      <div className="ui grid container">
        <CourseDetails course={this.state.selectedCourse} />
        <CourseSelector
          handleCourseClick={this.handleCourseClick}
          courses={this.state.courseList}
        />
        <StudentsList
          handleStudentClick={this.handleStudentClick}
          handleHere={this.handleHere}
          attendingStudents={this.state.attendingStudents}
          selectedStudentAttendance={this.state.selectedStudentAttendance}
        />
      </div>
    );
  }
}

export default CourseContainer;
