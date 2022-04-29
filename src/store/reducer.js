import { SetUserInfo, RemoveUserInfo, LoginShow, LoginRemove, SetUserNewsType, SetFileList } from "./constants.js";

const defaultState = {
  userInfo: null,//用户信息
  loginShow: false,//模态登录框是否显示
  userNewsType: [],//内容管理的新闻资讯类型，因为传的id，每次都要请求类型列表，所以第一次请求就存起来不用每次都请求
  fileList: [], //发布文章封面图片的file文档，存localstorage会转字符串，file文件会失效，所以存store，主要在预览后上传组件就重新调用了，file文件清零了
  newsMayLikeId: 2,//新闻资讯推荐id，前端需要这个做判断，在这写死了，只写一次，后续有更改只改这里
  newsFollowId: 1,//新闻关注id
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
    case SetUserNewsType:
      return {
        ...state,
        userNewsType: action.newsType
      };
    case SetFileList:
      return {
        ...state,
        fileList: action.fileList
      }
    default:
      return state;
  }
}

export default reducer;