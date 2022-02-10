import {get, post} from '../utils/request'

//新闻类别
export const  newsTypeList= (): Promise<API.IResult> => {
    return get('news/public/type-list')
}

//新闻列表
export const  newsNewsList= (data): Promise<API.IResult> => {
    return get('news/public/news-list',data)
}

//感兴趣列表
export const  newsAList= (data): Promise<API.IResult> => {
    return get('news/public/interest',data)
}

export const integralRecord =(data):Promise<API.IResult>=>{
    return  post('user/my-center/integral-record',data)
}

//新闻资讯新闻详情
export const newsDetail =(data):Promise<API.IResult>=>{
    return  get('news/public/detail',data)
}

//获取评论列表
export const commentList =(data):Promise<API.IResult>=>{
    return  get('news/public/comment-list',data)
}

//获取每日阅读榜

export const newsReadList =(data):Promise<API.IResult>=>{
    return  get('news/public/read-list',data)
}

//新闻作者信息和作品列表

export const newsWorksList =(data):Promise<API.IResult>=>{
    return  get('news/public/works-list',data)
}

//评论
export const subComment =(data):Promise<API.IResult>=>{
    return  post('news/do-comment',data)
}

//关注
export const doAttention =(data):Promise<API.IResult>=>{
    return  post('news/do-attention',data)
}

//收藏
export const doCollect =(data):Promise<API.IResult>=>{
    return  post('news/do-collect',data)
}

//举报
export const sureReport =(data):Promise<API.IResult>=>{
    return  post('news/do-report',data)
}

//点赞评论
export const newsAddPrais =(data):Promise<API.IResult>=>{
    return  post('news/do-praise',data)
}

//用户数据统计
export const newsCreatorDate =():Promise<API.IResult>=>{
    return  get('news/public/statistics')
}

//添加阅读记录
export const addReadLog =(data):Promise<API.IResult>=>{
    return  post('news/do-read',data)
}

//个人中心新闻详情 
export const writingDetail =(data):Promise<API.IResult>=>{
    return get('news/writing/detail',data)
}

//个人中心编辑获取的新闻详情
export const getEditNews =(data):Promise<API.IResult>=>{
    return get('news/writing/getEditNews',data)
}