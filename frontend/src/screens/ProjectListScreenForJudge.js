import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listJudgeProjects } from "../actions/projectActions";
import { getActiveSession } from "../actions/sessionActions";
import { listSessions } from "../actions/sessionActions";

const ProjectListScreenForJudge = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sessionActive = useSelector((state) => state.sessionActive);
  const { session: activeSession, loading, error } = sessionActive;

  const sessionList = useSelector((state) => state.sessionList);
  const { sessions } = sessionList;

  const [currSession, setCurrSession] = useState(activeSession?.name);

  const projectListForJudge = useSelector((state) => state.projectListForJudge);
  const {
    loading: loadingProjects,
    error: errorprojects,
    projects,
  } = projectListForJudge;

  useEffect(() => {
    if (userInfo) {
      dispatch(listJudgeProjects());
      dispatch(getActiveSession());
      dispatch(listSessions());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>
            <b>Approved projects</b> <i className="fas fa-hand-point-down"></i>{" "}
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

      {loadingProjects || loading ? (
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
              <th>Frontend</th>
              <th>Backend</th>
              <th>database</th>
              <th>Approved</th>
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
                    <td>{project.frontend}</td>
                    <td>{project.backend}</td>
                    <td>{project.database}</td>

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

export default ProjectListScreenForJudge;
