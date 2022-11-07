import { useState } from "react";
import { useHistory } from "react-router-dom";

function AddStudent() {
  const history = useHistory();

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    mentor_id: "",
    mentor_name: "",
  });

  const { name, email, course } = newStudent;

  const onInputChange = (e) => {
    // console.log("newMentor", newMentor);
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var tmpArr = [];
    tmpArr.push(newStudent);
    console.log(tmpArr);

    const url = "https://vivek-assign-mentor.herokuapp.com/students/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(tmpArr),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("Success:", data);
        history.push("/students");
      });
  };
  return (
    <div className="container ">
      <div className="col-md-6 offset-md-3">
        <div className="row justify-content-center">
          <div className="card p-4 mt-5 bg-light">
            <h2>Add Student</h2>
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
              {/* <div className="form-group mb-3">
                <label>Course</label>
                <input
                  type="text"
                  className="form-control"
                  id="course"
                  name="course"
                  onChange={(e) => onInputChange(e)}
                  value={course}
                />
              </div> */}
              <div className="form-group mb-3">
                <label>Course</label>
                <select
                  className="form-select"
                  name="course"
                  onChange={(e) => onInputChange(e)}
                >
                  <option value="none">None</option>
                  <option value="DADA">DADA</option>
                  <option value="CMC">CMC</option>
                  <option value="Transfiguration">Transfiguration</option>
                  <option value="Herbology">Herbology</option>
                  <option value="Arithmancy">Arithmancy</option>
                  <option value="Quidditch">Quidditch</option>
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

export default AddStudent;
