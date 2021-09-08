import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listJudgeProjects } from "../actions/projectActions";
import { getActiveSession } from "../actions/sessionActions";
import { listSessions } from "../actions/sessionActions";

const ResultScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sessionActive = useSelector((state) => state.sessionActive);
  const { session: activeSession, loading, error } = sessionActive;

  const sessionList = useSelector((state) => state.sessionList);
  const { sessions } = sessionList;

  const projectListForJudge = useSelector((state) => state.projectListForJudge);
  const {
    loading: loadingProjects,
    error: errorprojects,
    projects,
  } = projectListForJudge;

  const [currSession, setCurrSession] = useState(activeSession?.name);
  let ranking = 0;

  const filteredProjects = projects?.sort(
    (a, b) => parseInt(b.totalNumbers) - parseInt(a.totalNumbers)
  );

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
      {error && <Message variant="danger">{error}</Message>}
      <Row className="align-items-center">
        <Col>
          <h1>
            {" "}
            <b>Results...</b>{" "}
          </h1>
        </Col>

        <Col className="text-right">
          <Dropdown>
            <Dropdown.Toggle size="1" className="my-3" id="dropdown-basic">
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

      {loadingProjects ?? loading ? (
        <Loader />
      ) : errorprojects ? (
        <Message variant="danger">{errorprojects}</Message>
      ) : (
        <Table striped hover resposnsive="true" className="table-sm">
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Project Name</th>
              <th>Category</th>
              <th>TeamMembers</th>
              <th>Session</th>
              <th>Total Numbers</th>
              <th>Total Marked By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects?.map(
              (project) =>
                project?.session === currSession && (
                  <tr key={project._id}>
                    <td> {++ranking} </td>
                    <td>{project.name}</td>
                    <td>{project.category}</td>
                    <td>{project.teammembers}</td>
                    <td> {project?.session} </td>
                    <td> {project?.totalNumbers} </td>
                    <td> {project?.totalMarkedBy} </td>

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

export default ResultScreen;
