import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreenForModerator from "./screens/UserListScreenForModerator";
import UserEditScreenForModerator from "./screens/UserEditScreenForModerator";
import SessionListScreen from "./screens/SessionListScreen";
import SessionEditScreen from "./screens/SessionEditScreen";
import ProjectRegisterScreen from "./screens/ProjectRegisterScreen";
import MySubmissionsScreen from "./screens/MySubmissionsScreen";
import ProjectScreen from "./screens/ProjectScreen";
import ProjectEditScreenMy from "./screens/ProjectEditScreenMy";
import ProjectListScreenForModerator from "./screens/ProjectListScreenForModerator";
import ProjectEditScreenForModerator from "./screens/ProjectEditScreenForModerator";
import ProjectListScreenForJudge from "./screens/ProjectListScreenForJudge";
import ResultScreen from "./screens/ResultScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-5">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/" exact component={HomeScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/project/createproject"
            component={ProjectRegisterScreen}
          />
          <Route path="/mysubmissions" component={MySubmissionsScreen} exact />
          <Route path="/projects/:id" component={ProjectScreen} exact />
          <Route
            path="/projects/:id/edit"
            component={ProjectEditScreenMy}
            exact
          />

          <Route
            path="/moderator/userlist"
            component={UserListScreenForModerator}
            exact
          />

          <Route
            path="/moderator/session/:id/edit"
            component={SessionEditScreen}
            exact
          />

          <Route
            path="/moderator/sessionlist/"
            exact
            component={SessionListScreen}
          />

          <Route
            path="/moderator/user/:id/edit"
            component={UserEditScreenForModerator}
            exact
          />

          <Route
            path="/moderator/projectlist"
            component={ProjectListScreenForModerator}
            exact
          />
          <Route
            path="/moderator/projects/:id/edit"
            component={ProjectEditScreenForModerator}
            exact
          />
          <Route
            path="/judge/projectlist"
            component={ProjectListScreenForJudge}
            exact
          />
          <Route path="/results" component={ResultScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
