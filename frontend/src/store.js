import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userDetailsReducerForModerator,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userUpdateByModeratorReducer,
} from "./reducers/userReducers";

import {
  sessionCreateReducer,
  sessionListReducer,
  sessionDeleteReducer,
  sessionUpdateReducer,
  sessionDetailsReducer,
  activeSessionListReducer,
} from "./reducers/sessionReducers";

import {
  projectRegisterReducer,
  projectListReducer,
  projectListForModeratorReducer,
  projectDetailsReducer,
  projectDeleteReducer,
  projectUpdateReducer,
  projectUpdateByModeratorReducer,
  projectListForJudgeReducer,
  projectMarkReducer,
} from "./reducers/projectReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDetailsForModerator: userDetailsReducerForModerator,
  userUpdateProfile: userUpdateProfileReducer,

  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateByModerator: userUpdateByModeratorReducer,

  sessionList: sessionListReducer,
  sessionDetails: sessionDetailsReducer,
  sessionCreate: sessionCreateReducer,
  sessionDelete: sessionDeleteReducer,
  sessionUpdate: sessionUpdateReducer,
  sessionActive: activeSessionListReducer,

  projectRegister: projectRegisterReducer,
  projectList: projectListReducer,
  projectListForModerator: projectListForModeratorReducer,
  projectListForJudge: projectListForJudgeReducer,
  projectDetails: projectDetailsReducer,
  projectDelete: projectDeleteReducer,
  projectUpdate: projectUpdateReducer,
  projectUpdateByModerator: projectUpdateByModeratorReducer,
  ProjectMark: projectMarkReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
