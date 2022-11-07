import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Switch, Route, Link, Redirect, NavLink } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddStudent from "./pages/AddStudent";
import AddMentor from "./pages/AddMentor";
import Mentors from "./pages/Mentors";
import Students from "./pages/Students";
import Home from "./pages/Home";
import AssignStudents from "./pages/AssignStudents";
import MentorDetails from "./pages/MentorDetails";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/students">
            <Students />
          </Route>
          <Route path="/mentors">
            <Mentors />
          </Route>
          <Route path="/mentors/:id">
            <Mentors />
          </Route>
          <Route path="/addstudent">
            <AddStudent />
          </Route>
          <Route path="/addmentor">
            <AddMentor />
          </Route>
          <Route path="/editstudent/:id">
            <EditStudent />
          </Route>
          <Route path="/mentor-details/:id">
            <MentorDetails />
          </Route>
          <Route path="/assignstudents/:id">
            <AssignStudents />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
