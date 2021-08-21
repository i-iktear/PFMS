import axios from "axios";
import {
  PROJECT_REGISTER_REQUEST,
  PROJECT_REGISTER_SUCCESS,
  PROJECT_REGISTER_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_LIST_FOR_MODERATOR_REQUEST,
  PROJECT_LIST_FOR_MODERATOR_SUCCESS,
  PROJECT_LIST_FOR_MODERATOR_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_BY_MODERATOR_REQUEST,
  PROJECT_UPDATE_BY_MODERATOR_SUCCESS,
  PROJECT_UPDATE_BY_MODERATOR_FAIL,
  PROJECT_LIST_FOR_JUDGE_REQUEST,
  PROJECT_LIST_FOR_JUDGE_SUCCESS,
  PROJECT_LIST_FOR_JUDGE_FAIL,
  PROJECT_MARK_REQUEST,
  PROJECT_MARK_SUCCESS,
  PROJECT_MARK_FAIL,
} from "../constants/projectConstants";

export const registerProject =
  (
    name,
    session,
    category,
    teammembers,
    frontend,
    backend,
    database,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_REGISTER_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/projects",
        {
          name,
          session,
          category,
          teammembers,
          frontend,
          backend,
          database,
          description,
        },
        config
      );
      dispatch({
        type: PROJECT_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROJECT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/projects/myprojects`, config);

    dispatch({
      type: PROJECT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listModeratorProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_LIST_FOR_MODERATOR_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/projects`, config);

    dispatch({
      type: PROJECT_LIST_FOR_MODERATOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_FOR_MODERATOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listJudgeProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_LIST_FOR_JUDGE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/projects/approved`, config);

    dispatch({
      type: PROJECT_LIST_FOR_JUDGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_FOR_JUDGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProjectDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/projects/${id}`, config);
    dispatch({
      type: PROJECT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/projects/${id}`, config);
    dispatch({
      type: PROJECT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/projects/${project._id}`,
      project,
      config
    );
    dispatch({
      type: PROJECT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProjectByModerator =
  (project) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_UPDATE_BY_MODERATOR_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/projects/moderator/${project._id}`,
        project,
        config
      );
      dispatch({
        type: PROJECT_UPDATE_BY_MODERATOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROJECT_UPDATE_BY_MODERATOR_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createProjectMark =
  (projectId, mark) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_MARK_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`/api/projects/${projectId}/marks`, mark, config);
      dispatch({
        type: PROJECT_MARK_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PROJECT_MARK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
