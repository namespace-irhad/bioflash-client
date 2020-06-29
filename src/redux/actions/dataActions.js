import { MENU_OPEN, GET_TOP_USERS, LOADING_UI, CLEAR_ERRORS } from "../types";
import Axios from "axios";
import { getTopResults } from "./gameActions";

export const menu_toggle = (current) => (dispatch) => {
  dispatch({
    type: MENU_OPEN,
    payload: !current,
  });
};

export const getTopUsers = () => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  Axios.get("/users/top")
    .then((res) => {
      dispatch({
        type: GET_TOP_USERS,
        payload: res.data,
      });
      dispatch(getTopResults());
      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => console.log(err));
};
