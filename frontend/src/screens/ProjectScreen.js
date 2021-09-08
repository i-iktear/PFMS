import React, { useState, useEffect } from "react";
import { Card, ListGroup, Row, Col, Form, Button } from "react-bootstrap";
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
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <center>
                  {" "}
                  <h1>
                    {" "}
                    <strong> Project Name: </strong> {project.name}
                  </h1>
                </center>
                <hr />
                <ListGroup.Item>
                  <p>
                    <strong> Project Category: </strong> {project.category}
                  </p>
                  <hr />

                  <p>
                    <strong> Teammembers: </strong> {project.teammembers}
                  </p>
                  <hr />
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    <strong> Frontend Details: </strong> {project.frontend}
                  </p>
                  <hr />

                  <p>
                    <strong> Backend Details: </strong> {project.backend}
                  </p>
                  <hr />

                  <p>
                    <strong> Database Details: </strong> {project.database}
                  </p>
                  <hr />
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <h4>
                    {" "}
                    <strong>Description:</strong> {project.description}{" "}
                  </h4>
                </ListGroup.Item>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={3}>
          <h1> </h1>
          <h1> </h1>
          {userInfo?.isJudge && (
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Give Marks</h2>
                  {projectMarkError && (
                    <Message variant="danger"> {projectMarkError} </Message>
                  )}
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="mark">
                      <Form.Label>Mark</Form.Label>
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
                      <Form.Label>Comment</Form.Label>
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
          <h2>Marked Given By other Judges</h2>
          {project?.numbers?.length === 0 && (
            <Message> No one Marked yet </Message>
          )}
          <ListGroup variant="flush">
            {project?.numbers?.map((mark) => (
              <ListGroup.Item key={mark._id}>
                <hr />
                <strong>{mark.name}</strong>
                <h2>Marks :{mark.number} </h2>
                <p> {mark.createdAt.substring(0, 10)} </p>
                <p> {mark.comment} </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}></Col>
      </Row>
    </>
  );
};

export default ProjectScreen;
