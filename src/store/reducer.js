import { SetUserInfo, RemoveUserInfo,LoginShow,LoginRemove } from "./constants.js";

const defaultState = {
    userInfo: localStorage.getItem('userInfo'),
    loginShow:false
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case SetUserInfo:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case RemoveUserInfo:
      return {
        ...state,
        userInfo: null,
      };
    case LoginShow:
      return {
        ...state,
        loginShow: true,
      };
    case LoginRemove:
      return {
        ...state,
        loginShow: false,
      };
    default:
      return state;
  }
}

export default reducer;