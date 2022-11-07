import { useState, useEffect } from "react";
import MentorRow from "../components/MentorRow";

function Home() {
  const [mentorList, setMentorList] = useState([]);

  const url = "https://vivek-assign-mentor.herokuapp.com/mentors/";

  const getMentors = () => {
    fetch(url, { method: "GET" })
      .then((data) => data.json())
      .then((stds) => setMentorList(stds));
  };

  useEffect(getMentors, []);

  console.log(mentorList);
  return (
    <>
      <div className="row">
        <h2>Manage Mentors</h2>
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
                    </tr>
                  </thead>
                  <tbody>
                    {mentorList.length > 0 ? (
                      ""
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Mentors Yet
                        </td>
                      </tr>
                    )}
                    {mentorList.map((mentordata) => {
                      return (
                        <MentorRow
                          key={mentordata._id}
                          mentordata={mentordata}
                          getMentors={getMentors}
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
