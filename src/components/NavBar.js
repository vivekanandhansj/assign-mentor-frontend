import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <header className="mb-4">
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container">
          <div className="d-flex col-6 flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to="/"
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <h1>Assign Mentor</h1>
            </Link>

            <ul className="nav col-6 col-lg-auto my-2 justify-content-end my-md-0 text-small">
              <li>
                <NavLink className="nav-link text-white" to="/">
                  <FontAwesomeIcon icon={faHome} />
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-white" to="/students">
                  Students
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-white" to="/mentors">
                  Mentors
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-white" to="/addstudent">
                  Add Student
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-white" to="/addmentor">
                  Add Mentor
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
