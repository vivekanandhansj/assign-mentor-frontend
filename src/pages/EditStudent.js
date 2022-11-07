import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function EditStudent() {
  const history = useHistory();
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    mentor_id: "",
    mentor_name: "",
  });

  const [mentorList, setMentorList] = useState([]);

  const { name, email, course, mentor_name, mentor_id } = student;

  const onInputChange = (e) => {
    console.log(
      "e.target.name",
      e.target.name,
      e.target.options[e.target.selectedIndex].innerHTML
    );
    if (e.target.name !== "mentor_id") {
      setStudent({ ...student, [e.target.name]: e.target.value });
    } else {
      if (e.target.value !== "none") {
        setStudent({
          ...student,
          ["mentor_id"]: e.target.value,
          ["mentor_name"]: e.target.options[e.target.selectedIndex].innerHTML,
        });
      } else {
        setStudent({
          ...student,
          ["mentor_id"]: "",
          ["mentor_name"]: "",
        });
      }
    }
  };

  const url = "https://vivek-assign-mentor.herokuapp.com/students/";
  const url2 = "https://vivek-assign-mentor.herokuapp.com/mentors/";

  const loadStudent = () => {
    fetch(url + id, { method: "GET" })
      .then((data) => data.json())
      .then((mvs) => setStudent(mvs));
  };

  useEffect(loadStudent, []);

  const getMentors = () => {
    fetch(url2, { method: "GET" })
      .then((data) => data.json())
      .then((stds) => setMentorList(stds));
  };

  useEffect(getMentors, []);

  const onSubmit = (e) => {
    e.preventDefault();
    var tmpArr = [];
    delete student["_id"];
    tmpArr.push(student);
    console.log(JSON.stringify(tmpArr));

    fetch(url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(student),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("Success:", data);
        history.push("/");
      });
  };

  console.log("mentorList", mentorList);

  return (
    <div className="container ">
      <div className="col-md-6 offset-md-3">
        <div className="row justify-content-center">
          <div className="card p-4 mt-5 bg-light">
            <h2>Edit Student</h2>
            <form>
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={(e) => onInputChange(e)}
                  value={name}
                />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={(e) => onInputChange(e)}
                  value={email}
                />
              </div>
              <div className="form-group mb-3">
                <label>Course</label>
                <input
                  type="text"
                  className="form-control"
                  id="course"
                  name="course"
                  onChange={(e) => onInputChange(e)}
                  value={course}
                />
              </div>
              <div className="form-group mb-3">
                <label>Mentor</label>
                <select
                  className="form-select"
                  name="mentor_id"
                  value={mentor_id}
                  onChange={(e) => onInputChange(e)}
                >
                  <option value="none">No Mentor</option>
                  {mentorList.map((mentor) => {
                    return (
                      <option key={mentor._id} value={mentor._id}>
                        {mentor.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;
