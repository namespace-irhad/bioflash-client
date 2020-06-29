import {
  SET_ANSWER_OPTIONS,
  SHUFFLE_QUESTIONS,
  GET_SYMPTOM_IMAGES,
  GET_TOP_RESULTS,
  GET_LATEST_RESULTS,
  CLEAR_RESULTS,
} from "../types";

const initialState = {
  answerOptions: [],
  symptomImages: [],
  latestResults: [],
  topResults: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ANSWER_OPTIONS:
      return {
        ...state,
        answerOptions: action.payload,
      };
    case GET_SYMPTOM_IMAGES:
      return {
        ...state,
        symptomImages: action.payload,
      };
    case SHUFFLE_QUESTIONS:
      return {
        ...state,
        answerOptions: action.payload,
      };
    case GET_LATEST_RESULTS:
      return {
        ...state,
        latestResults: action.payload,
      };
    case GET_TOP_RESULTS:
      return {
        ...state,
        topResults: action.payload,
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        topResults: [],
      };
    default:
      return state;
  }
}
