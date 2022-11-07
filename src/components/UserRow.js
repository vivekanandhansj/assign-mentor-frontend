import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

function UserRow({ studentdata, getStudents }) {
  const history = useHistory();
  return (
    <tr>
      <td className="pl-4">{studentdata.id}</td>
      <td>
        <h5 className="font-medium mb-0">{studentdata.name}</h5>
      </td>
      <td>
        <span className="text-muted">{studentdata.email}</span>
      </td>
      <td>
        <span className="text-muted">{studentdata.course}</span>
      </td>
      <td>
        <span className="text-muted">{studentdata.mentor_name}</span>
      </td>
      <td className="crud-ops">
        <button
          type="button"
          className="btn btn-outline-info btn-circle btn-sm btn-circle ml-2"
          onClick={() => {
            const url = "https://vivek-assign-mentor.herokuapp.com/students/";
            fetch(url + studentdata._id, { method: "DELETE" })
              .then((data) => data.json())
              .then(() => getStudents())
              .then(() => history.push("/students"));
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <button
          type="button"
          className="btn btn-outline-info btn-circle btn-sm btn-circle ml-2"
          onClick={() => {
            history.push("/editstudent/" + studentdata._id);
          }}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          type="button"
          className="btn btn-outline-info btn-circle btn-sm btn-circle ml-2"
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
