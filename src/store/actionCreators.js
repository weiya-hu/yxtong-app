// 引入需要使用的 常量
import { SetUserInfo, RemoveUserInfo,LoginShow,LoginRemove } from "./constants.js";
// 存储用户信息
export const setUserInfo = (userInfo) => {
  return {
    type: SetUserInfo,
    userInfo,
  };
};
// 删除用户信息
export const removeUserInfo = () => ({
  type: RemoveUserInfo
});

//设定悬浮框登录显示
export const loginShow = () => ({
  type: LoginShow
})

//设定悬浮框登录消失
export const loginRemove = () => ({
  type: LoginRemove
})