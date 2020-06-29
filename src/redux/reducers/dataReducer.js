import { MENU_OPEN, GET_TOP_USERS } from "../types";

const initialState = {
  menu_open: false,
  top_users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MENU_OPEN:
      return {
        ...state,
        menu_open: action.payload,
      };
    case GET_TOP_USERS:
      return {
        ...state,
        top_users: action.payload,
      };
    default:
      return state;
  }
}
