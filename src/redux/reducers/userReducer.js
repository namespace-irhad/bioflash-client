import {
  SET_USER,
  SET_ERRORS,
  SET_SUCCESS,
  CLEAR_SUCCESS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  openImage: false,
  error: {},
  credentials: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        openImage: true,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        openImage: false,
      };
    default:
      return state;
  }
}
