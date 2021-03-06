import React, { useEffect } from "react";
import { Button, Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMyProjects, deleteProject } from "../actions/projectActions";

const MySubmissionsScreen = ({ history }) => {
  const noSubmissionMessage = ` <> Currently You don't have any Submissions </> `;
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectList = useSelector((state) => state.projectList);
  const {
    loading: loadingProjects,
    error: errorprojects,
    projects,
  } = projectList;

  const projectDelete = useSelector((state) => state.projectDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = projectDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listMyProjects());
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
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger"> {errorDelete} </Message>}
      {loadingProjects ? (
        <Loader />
      ) : errorprojects ? (
        <Message variant="danger">{errorprojects}</Message>
      ) : (
        <>
          {projects.length === 0 ? (
            <>
              {" "}
              <Container style={containerStyle}>
                <h1 style={{ fontSize: 40 }}> {noSubmissionMessage} </h1>
              </Container>{" "}
            </>
          ) : (
            <>
              {" "}
              <center>
                <h2>
                  <b> My Submissions</b> <i className="fab fa-angellist"> </i>{" "}
                </h2>
              </center>
              <br />
              <Table striped hover resposnsive="true" className="table-sm">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Category</th>
                    <th>TeamMembers</th>
                    <th>Approved</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
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
                        <LinkContainer to={`/projects/${project._id}/edit`}>
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
                  ))}
                </tbody>
              </Table>{" "}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MySubmissionsScreen;
