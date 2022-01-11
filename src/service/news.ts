import {get, post} from '../utils/request'

export const  newsTypeList= (): Promise<API.IResult> => {
    return get('news/public/typeList')
}

export const  newsNewsList= (data): Promise<API.IResult> => {
    return get('news/public/newsList',data)
}

export const  newsAList= (data): Promise<API.IResult> => {
    return get('news/public/AList',data)
}

export const integralRecord =(data):Promise<API.IResult>=>{
    return  post('user/my-center/integral-record',data)
}

