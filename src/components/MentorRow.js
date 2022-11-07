import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPen,
  faEye,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

function MentorRow({ mentordata, getMentors }) {
  const history = useHistory();
  return (
    <tr>
      <td className="pl-4">#</td>
      <td>
        <h5 className="font-medium mb-0">{mentordata.name}</h5>
      </td>
      <td>
        <span className="text-muted">{mentordata.email}</span>
      </td>
      <td>
        <span className="text-muted">{mentordata.course}</span>
      </td>
      <td className="crud-ops">
        <button
          type="button"
          className="btn btn-outline-info btn-circle btn-sm btn-circle ml-2"
          onClick={() => {
            const url = "https://vivek-assign-mentor.herokuapp.com/mentors/";
            fetch(url + mentordata._id, { method: "DELETE" })
              .then((data) => data.json())
              .then(() => getMentors())
              .then(() => history.push("/mentors"));
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <button
          type="button"
          className="btn btn-outline-info btn-circle btn-sm btn-circle ml-2"
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          type="button"
          className="btn btn-outline-info btn-circle btn-sm btn-circle ml-2"
          onClick={(e) => {
            history.push("/mentor-details/" + mentordata._id);
          }}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button
          type="button"
          className="assign btn btn-outline-info btn-circle btn-sm btn-circle ml-2"
          onClick={(e) => {
            history.push("/assignstudents/" + mentordata._id);
          }}
        >
          Assign <FontAwesomeIcon icon={faUserGraduate} />
        </button>
      </td>
    </tr>
  );
}

export default MentorRow;
