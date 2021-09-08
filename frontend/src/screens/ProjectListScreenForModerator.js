import React, { useEffect, useState } from "react";
import { Button, Row, Col, Dropdown, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listModeratorProjects,
  deleteProject,
} from "../actions/projectActions";

import { getActiveSession } from "../actions/sessionActions";
import { listSessions } from "../actions/sessionActions";

const ProjectListScreenForModerator = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sessionActive = useSelector((state) => state.sessionActive);
  const { session: activeSession, loading, error } = sessionActive;

  const sessionList = useSelector((state) => state.sessionList);
  const { sessions } = sessionList;

  const [currSession, setCurrSession] = useState(activeSession?.name);

  const projectListForModerator = useSelector(
    (state) => state.projectListForModerator
  );
  const {
    loading: loadingProjects,
    error: errorprojects,
    projects,
  } = projectListForModerator;

  const projectDelete = useSelector((state) => state.projectDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = projectDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listModeratorProjects());
      dispatch(getActiveSession());
      dispatch(listSessions());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>
            <b> Submissions List </b> <i className="fas fa-hand-point-down"></i>{" "}
          </h1>
        </Col>
        <Col className="text-right">
          <Dropdown>
            <Dropdown.Toggle className="my-3" id="dropdown-basic">
              {currSession}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {sessions?.map(
                (session) =>
                  session?.name !== currSession && (
                    <Dropdown.Item
                      onClick={() => setCurrSession(session.name)}
                      key={session._id}
                    >
                      {" "}
                      {session.name}{" "}
                    </Dropdown.Item>
                  )
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <br />

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger"> {errorDelete} </Message>}
      {loading || loadingProjects ? (
        <Loader />
      ) : errorprojects || error ? (
        <Message variant="danger">{errorprojects || error}</Message>
      ) : (
        <Table striped hover resposnsive="true" className="table-sm">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Category</th>
              <th>TeamMembers</th>
              <th>Approved</th>
              <th>Submission Approval</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map(
              (project) =>
                project.session === currSession && (
                  <tr key={project._id}>
                    <td>{project.name}</td>
                    <td>{project.category}</td>
                    <td>{project.teammembers}</td>

                    <td>
                      {project.isApproved ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer
                        to={`/moderator/projects/${project._id}/edit`}
                      >
                        <Button variant="info" className="btn-sm">
                          <i className="fas fa-edit"> </i>
                        </Button>
                      </LinkContainer>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => {
                          deleteHandler(project._id);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                    <td>
                      <LinkContainer to={`/projects/${project._id}`}>
                        <Button className="btn-sm" variant="info">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProjectListScreenForModerator;
