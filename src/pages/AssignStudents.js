import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

function AssignStudents() {
  let history = useHistory();
  const [mentorDetails, setMentorDetails] = useState({
    _id: "",
    name: "",
    email: "",
    course: "",
    students: [],
  });

  const [studentList, setStudentList] = useState([]);

  const [assignList, setAssignList] = useState([]);

  const { id } = useParams();
  // console.log(id);

  const url = "https://vivek-assign-mentor.herokuapp.com/mentors/";

  const loadMentorDetail = () => {
    fetch(url + id, { method: "GET" })
      .then((data) => data.json())
      .then((mvs) => setMentorDetails(mvs));
  };

  useEffect(loadMentorDetail, []);

  const url2 = "https://vivek-assign-mentor.herokuapp.com/unassignedstudents";

  const getStudents = () => {
    fetch(url2, { method: "GET" })
      .then((data) => data.json())
      .then((stds) => setStudentList(stds));
  };

  useEffect(getStudents, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const url3 = "https://vivek-assign-mentor.herokuapp.com/students/";

    // fetch(url + mentorDetails._id, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    //   body: JSON.stringify({ students: assignList }),
    // })
    //   .then((data) => data.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   });

    // console.log("assignList", assignList);
    assignList.forEach((assignedStudent) => {
      fetch(url3 + assignedStudent, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          mentor_id: mentorDetails._id,
          mentor_name: mentorDetails.name,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          console.log("Success:", data);
          history.push("/students");
        });
    });
  };

  const warningText =
    studentList.length > 0 ? "Assign Students" : "No Students";

  return (
    <div className="container">
      <section>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h2 className="my-3">{mentorDetails.name}</h2>
                <p className="text-muted mb-4">{mentorDetails.course}</p>
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      (window.location = `mailto:${mentorDetails.email}`)
                    }
                  >
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h2>{warningText}</h2>
              </div>
              <div className="card-body">
                {studentList.map((studentdata) => {
                  return (
                    <UnassignedStudents
                      key={studentdata._id}
                      studentdata={studentdata}
                      assignList={assignList}
                      setAssignList={setAssignList}
                    />
                  );
                })}
                {studentList.length > 0 ? (
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      // console.log(assignList.length, typeof assignList);
                      if (assignList.length > 0) {
                        console.log("Students Assigned");
                        onSubmit(e);
                      } else {
                        console.log("Please select and assign students");
                      }
                    }}
                  >
                    Assign
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AssignStudents;

function UnassignedStudents({ studentdata, assignList, setAssignList }) {
  let existId = assignList.includes(studentdata._id);
  console.log("existId", existId);

  return (
    <div className="row">
      <div className="col-sm-3">
        <p className="mb-0">{studentdata.name}</p>
      </div>
      <div className="btn btn-sm col-sm-9">
        <button
          className="btn btn-primary btn-sm"
          type="submit"
          onClick={() => {
            let tmpArr = [];
            tmpArr.push(studentdata._id);
            setAssignList([...assignList, ...tmpArr]);
            // console.log(studentdata._id);
          }}
        >
          {existId ? "-" : "+"}
        </button>
      </div>
    </div>
  );
}
