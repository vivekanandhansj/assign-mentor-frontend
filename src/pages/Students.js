import UserRow from "../components/UserRow";
import { useState, useEffect } from "react";

function Home() {
  const [studentList, setStudentList] = useState([]);

  const url = "https://vivek-assign-mentor.herokuapp.com/students/";

  const getStudents = () => {
    fetch(url, { method: "GET" })
      .then((data) => data.json())
      .then((stds) => setStudentList(stds));
  };

  useEffect(getStudents, []);

  console.log(studentList);
  return (
    <>
      <div className="row">
        <h2>Manage Users</h2>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium pl-4"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Course
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Mentor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentList.length > 0 ? (
                      ""
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Students Yet
                        </td>
                      </tr>
                    )}
                    {studentList.map((studentdata) => {
                      return (
                        <UserRow
                          key={studentdata._id}
                          studentdata={studentdata}
                          getStudents={getStudents}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
