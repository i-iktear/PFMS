import {
  PROJECT_REGISTER_REQUEST,
  PROJECT_REGISTER_SUCCESS,
  PROJECT_REGISTER_FAIL,
  PROJECT_REGISTER_RESET,
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
  PROJECT_UPDATE_RESET,
  PROJECT_UPDATE_BY_MODERATOR_REQUEST,
  PROJECT_UPDATE_BY_MODERATOR_SUCCESS,
  PROJECT_UPDATE_BY_MODERATOR_FAIL,
  PROJECT_UPDATE_BY_MODERATOR_RESET,
  PROJECT_LIST_FOR_JUDGE_REQUEST,
  PROJECT_LIST_FOR_JUDGE_SUCCESS,
  PROJECT_LIST_FOR_JUDGE_FAIL,
  PROJECT_MARK_REQUEST,
  PROJECT_MARK_SUCCESS,
  PROJECT_MARK_FAIL,
  PROJECT_MARK_RESET,
} from "../constants/projectConstants";

export const projectRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_REGISTER_REQUEST:
      return { loading: true };
    case PROJECT_REGISTER_SUCCESS:
      return { loading: false, projectInfo: action.payload, success: true };
    case PROJECT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_REGISTER_RESET:
      return { error: {} };
    default:
      return state;
  }
};

export const projectListReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true };
    case PROJECT_LIST_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case PROJECT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectListForModeratorReducer = (
  state = { projects: [] },
  action
) => {
  switch (action.type) {
    case PROJECT_LIST_FOR_MODERATOR_REQUEST:
      return { loading: true };
    case PROJECT_LIST_FOR_MODERATOR_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case PROJECT_LIST_FOR_MODERATOR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectListForJudgeReducer = (
  state = { projects: [] },
  action
) => {
  switch (action.type) {
    case PROJECT_LIST_FOR_JUDGE_REQUEST:
      return { loading: true };
    case PROJECT_LIST_FOR_JUDGE_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case PROJECT_LIST_FOR_JUDGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectDetailsReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PROJECT_DETAILS_SUCCESS:
      return { loading: false, project: action.payload };
    case PROJECT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DELETE_REQUEST:
      return { loading: true };
    case PROJECT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectUpdateReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return { loading: true };
    case PROJECT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_UPDATE_RESET:
      return { session: {} };
    default:
      return state;
  }
};

export const projectUpdateByModeratorReducer = (
  state = { project: {} },
  action
) => {
  switch (action.type) {
    case PROJECT_UPDATE_BY_MODERATOR_REQUEST:
      return { loading: true };
    case PROJECT_UPDATE_BY_MODERATOR_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_UPDATE_BY_MODERATOR_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_UPDATE_BY_MODERATOR_RESET:
      return { session: {} };
    default:
      return state;
  }
};

export const projectMarkReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_MARK_REQUEST:
      return { loading: true };
    case PROJECT_MARK_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_MARK_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_MARK_RESET:
      return {};
    default:
      return state;
  }
};
