import {get, post} from '../utils/request'

export const  newsTypeList= (): Promise<API.IResult> => {
    return get('news/public/typeList')
}

export const  newsNewsList= (data): Promise<API.IResult> => {
    return get('news/public/newsList',data)
}

export const  newsAList= (data): Promise<API.IResult> => {
    return get('news/public/interest',data)
}

export const integralRecord =(data):Promise<API.IResult>=>{
    return  post('user/my-center/integral-record',data)
}


export const newsDetail =(data):Promise<API.IResult>=>{
    return  get('news/public/detail',data)
}

//获取评论列表
export const commentList =(data):Promise<API.IResult>=>{
    return  get('news/public/commentList',data)
}

//获取每日阅读榜

export const newsReadList =(data):Promise<API.IResult>=>{
    return  get('news/public/readList',data)
}

//新闻作者信息和作品列表

export const newsWorksList =(data):Promise<API.IResult>=>{
    return  get('news/public/worksList',data)
}
