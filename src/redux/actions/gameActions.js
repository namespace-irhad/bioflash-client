import {
  SET_ANSWER_OPTIONS,
  SHUFFLE_QUESTIONS,
  GET_SYMPTOM_IMAGES,
  LOADING_UI,
  CLEAR_ERRORS,
  GET_LATEST_RESULTS,
  GET_TOP_RESULTS,
} from "../types";

import Axios from "axios";

import shuffle from "shuffle-array";

export const getAnswerOptions = () => (dispatch) => {
  Axios.get("/viruses")
    .then((res) => {
      dispatch({
        type: SET_ANSWER_OPTIONS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const shuffleArray = (questionList) => (dispatch) => {
  let newQuestions = questionList;
  shuffle(newQuestions);
  dispatch({
    type: SHUFFLE_QUESTIONS,
    payload: newQuestions,
  });
};

export const getSymptomImages = () => (dispatch) => {
  Axios.get("/symptoms/images")
    .then((res) => {
      dispatch({
        type: GET_SYMPTOM_IMAGES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const sendQuizResults = (data) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  Axios.post("/results", data)
    .then(() => {
      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => console.log(err));
};

export const getLatestResults = () => (dispatch) => {
  Axios.get("/results/user")
    .then((res) => {
      dispatch({
        type: GET_LATEST_RESULTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getTopResults = () => (dispatch) => {
  Axios.get("/results")
    .then((res) => {
      dispatch({
        type: GET_TOP_RESULTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
