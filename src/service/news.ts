import {get, post} from '../utils/request'

//新闻类别
export const  newsTypeList= (): Promise<API.IResult> => {
    return get('public/type.list','official')
}

//新闻列表
export const  newsNewsList= (data): Promise<API.IResult> => {
    return get('public/info.page','official',data)
}

//感兴趣列表
export const  newsAList= (data): Promise<API.IResult> => {
    return get('public/interest.page','official',data)
}

export const integralRecord =(data):Promise<API.IResult>=>{
    return  post('user/center/integral/record.page','user',data)
}

//新闻资讯新闻详情
export const newsDetail =(data):Promise<API.IResult>=>{
    return  get('public/detail.page','official',data)
}

//获取评论列表
export const commentList =(data):Promise<API.IResult>=>{
    return  get('public/comment.page','official',data)
}

//获取每日阅读榜

export const newsReadList =(data):Promise<API.IResult>=>{
    return  get('public/read.page','official',data)
}

//新闻作者信息和作品列表

export const newsWorksList =(data):Promise<API.IResult>=>{
    return  get('public/works.page','official',data)
}

//评论
export const subComment =(data):Promise<API.IResult>=>{
    return  post('news/comment.do','official',data)
}

//关注
export const doAttention =(data):Promise<API.IResult>=>{
    return  post('news/attention.do','official',data)
}

//收藏
export const doCollect =(data):Promise<API.IResult>=>{
    return  post('news/collect.do','official',data)
}

//举报
export const sureReport =(data):Promise<API.IResult>=>{
    return  post('news/report.do','official',data)
}

//点赞评论
export const newsAddPrais =(data):Promise<API.IResult>=>{
    return  post('news/praise.do','official',data)
}

//用户数据统计
export const newsCreatorDate =():Promise<API.IResult>=>{
    return  get('public/author.agg','official')
}

//添加阅读记录
export const addReadLog =(data):Promise<API.IResult>=>{
    return  post('news/do-read','official',data)
}

//个人中心新闻详情 
export const writingDetail =(data):Promise<API.IResult>=>{
    return get('news/creation/article/detail.get','official',data)
}

//个人中心编辑获取的新闻详情
export const getEditNews =(data):Promise<API.IResult>=>{
    return get('news/creation/article.get','official',data)
}

//个人中心删除文章
export const deleteNews =(data):Promise<API.IResult>=>{
    return post('news/creation/article.del','official',data)
}

//获取关注列表
export const newsFavorList= (data): Promise<API.IResult> => {
    return get('public/attention.page','official',data)
}

//获取用户获取文章、关注、粉丝数量
export const newsCreationAuthor =():Promise<API.IResult>=>{
    return  get('news/creation/author.agg','official')
}

//我的收藏
export const newsCreationcollection =(data):Promise<API.IResult>=>{
    return  get('news/creation/collection.page','official',data)
}

//获取文章栏目分类
export const newsCreationTypeList =():Promise<API.IResult>=>{
    return  get('news/creation/type.list','official')
}