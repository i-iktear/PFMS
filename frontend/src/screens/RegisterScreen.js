import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    const regEx = "@diu.edu.bd";

    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Password do not match");
    } else if (!email.includes(regEx)) {
      setMessage("Please Provide your Edu Email Provided by DIU");
    } else {
      dispatch(register(name, email, universityId, password));
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <center>
            <h1>
              Sign Up <i className="fas fa-user-plus"> </i>
            </h1>
          </center>

          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>
                  {" "}
                  <b>Name</b>{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="universityId">
                <Form.Label>
                  {" "}
                  <b>University ID</b>{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your University ID"
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="email">
              <Form.Label>
                {" "}
                <b>Email Address</b>{" "}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="password">
                <Form.Label>
                  {" "}
                  <b>Password</b>{" "}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="confirmPassword">
                <Form.Label>
                  {" "}
                  <b>Confirm Password</b>{" "}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re type your password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Button type="submit" size="lg" block variant="primary">
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Have an Account?
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Login
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
