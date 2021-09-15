import React, { useState, useEffect } from "react";
import { Card, ListGroup, Row, Col, Form, Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getProjectDetails,
  createProjectMark,
} from "../actions/projectActions";

import { PROJECT_MARK_RESET } from "../constants/projectConstants";

const ProjectScreen = ({ match, history }) => {
  const [mark, setMark] = useState(0);
  const [comment, setComment] = useState(" ");

  const projectId = match.params.id;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectDetails = useSelector((state) => state.projectDetails);
  const { project, loading, error } = projectDetails;

  const ProjectMark = useSelector((state) => state.ProjectMark);
  const { success: projectmarkSuccess, error: projectMarkError } = ProjectMark;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (projectmarkSuccess) {
      alert("Marks Submitted");
      setMark(0);
      setComment("");
      dispatch({ type: PROJECT_MARK_RESET });
    }

    dispatch(getProjectDetails(projectId));
  }, [dispatch, history, userInfo, projectId, projectmarkSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProjectMark(match.params.id, {
        number: mark,
        comment,
      })
    );
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <center>
            <h1>
              Submission Details
              <i className="fas fa-hand-point-down"></i>
            </h1>
          </center>
          <hr />
          <Card key={project._id}>
            <h4>
              <Card.Header>{project.name}</Card.Header>
            </h4>
            <Card.Body>
              <>
                <p style={{ fontSize: 18 }}>
                  <div>
                    <strong> Type: </strong>{" "}
                    <Badge variant="primary" className="mr-2">
                      {project.category}
                    </Badge>
                  </div>
                </p>
                {/* Frontend Stacks */}
                <p style={{ fontSize: 18 }}>
                  <strong>Frontend: </strong>
                  {project?.frontend?.split(",").map((frontend) => (
                    <Badge variant="success" className="mr-3" key={frontend}>
                      {frontend}
                    </Badge>
                  ))}
                </p>
                {/* {Backend Stacks} */}
                <p style={{ fontSize: 18 }}>
                  <strong> Backend: </strong>{" "}
                  {project?.backend?.split(",").map((backend) => (
                    <Badge variant="success" className="mr-3" key={backend}>
                      {backend}
                    </Badge>
                  ))}
                </p>
                {/* {Database Stacks} */}
                <p style={{ fontSize: 18 }}>
                  <strong> Database: </strong>{" "}
                  {project?.database?.split(",").map((database) => (
                    <Badge variant="success" className="mr-3" key={database}>
                      {database}
                    </Badge>
                  ))}
                </p>
                <p style={{ fontSize: 18 }}>
                  <strong> Teammembers: </strong> {project.teammembers}
                </p>
                <p style={{ fontSize: 18 }}>
                  <div className="mt-4">
                    <strong>Project Description :</strong>{" "}
                    <>{project.description}</>
                  </div>
                </p>
              </>
            </Card.Body>
          </Card>
        </Col>
        <Col md="auto">
          <h1> </h1>
          <h1> </h1>
          {userInfo?.isJudge && (
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <center>
                    <h2>Give Marks</h2>
                  </center>

                  {projectMarkError && (
                    <Message variant="danger"> {projectMarkError} </Message>
                  )}
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="mark">
                      <Form.Label>
                        {" "}
                        <strong>Mark</strong>{" "}
                      </Form.Label>
                      <Form.Control
                        as="input"
                        type="number"
                        min="40"
                        max="100"
                        value={mark}
                        onChange={(e) => setMark(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>
                        {" "}
                        <strong>Comment</strong>{" "}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      type="submit"
                      className="btn btn-lg btn-primary"
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Form>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
          <br />
          <h2>Marked Given By other Judges</h2>
          {project?.numbers?.length === 0 && (
            <Message> No one Marked yet </Message>
          )}
          {project?.numbers?.map((mark) => (
            <>
              <Card key={mark._id}>
                <Card.Header>{mark.name}</Card.Header>
                <Card.Body>
                  <p style={{ fontSize: 18 }}>
                    {" "}
                    <Badge className="mr-2" variant="success">
                      {mark.createdAt.substring(0, 10)}{" "}
                    </Badge>
                    <Badge className="mr-2" variant="success">
                      Marks :{mark.number}{" "}
                    </Badge>
                  </p>
                  <p style={{ fontSize: 18 }}> {mark.comment} </p>
                </Card.Body>
              </Card>
              <br />
            </>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ProjectScreen;
