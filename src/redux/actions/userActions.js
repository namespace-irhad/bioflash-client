import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_SUCCESS,
  CLEAR_SUCCESS,
  CLEAR_RESULTS,
} from "../types";
import { getAnswerOptions, getSymptomImages } from "./gameActions";
import { getTopUsers } from "./dataActions";
import Axios from "axios";

/**
 *
 * @param {object with user information sent by logging in} userData
 * @param {sending the history so we can reroute the user} history
 */
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  if (userData.password.length < 6) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        password: "Password needs to be longer.",
      },
    });
  } else {
    Axios.post("/login", userData)
      .then((res) => {
        setAuthorization(res.data.tokenId);
        dispatch(getUserData());
        dispatch({
          type: CLEAR_ERRORS,
        });
        history.push("/dashboard");
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      });
  }
};
export const getUserData = () => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  Axios.get("/user")
    .then((res) => {
      dispatch(getAnswerOptions());
      dispatch(getSymptomImages());
      dispatch(getTopUsers());
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("BioQuizToken");
  delete Axios.defaults.headers.common["Authorization"];
  dispatch({
    type: CLEAR_RESULTS,
  });
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};

export const registerNewUser = (newUserData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  if (newUserData.password.length < 6) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        password: "Password needs to be longer.",
      },
    });
  } else {
    Axios.post("/signup", newUserData)
      .then((res) => {
        setAuthorization(res.data.token);
        dispatch(getUserData());
        dispatch({
          type: CLEAR_ERRORS,
        });
        history.push("/");
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      });
  }
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  Axios.post("/user/image", formData)
    .then((res) => {
      Axios.get("/user").then((res) => {
        dispatch({
          type: SET_USER,
          payload: res.data,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.error,
      });
    });
};

export const addUserDetails = (newData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  Axios.post("/user", newData)
    .then(() => {
      dispatch(getUserData());
      dispatch({
        type: SET_SUCCESS,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_SUCCESS,
        });
      }, 4000);
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

/**
 *  Helper Functions
 * @param {token gained from logging/signing up} token
 */
const setAuthorization = (token) => {
  const BioQuizToken = `Bearer ${token}`;
  localStorage.setItem("BioQuizToken", BioQuizToken);
  Axios.defaults.headers.common["Authorization"] = BioQuizToken;
};
