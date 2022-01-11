import {get, post} from '../utils/request'
//用户信息
export const  userMycenterInfo= (): Promise<API.IResult> => {
    return get('user/my-center/info')
}
//我的收益
export const integralRecord =(data):Promise<API.IResult>=>{
    return  post('user/my-center/integral-record',data)
}

//签到信息
export const signInInfo =():Promise<API.IResult>=>{
    return  get('user/my-center/sign-in-info')
}


export const signIn =():Promise<API.IResult>=>{
    return  post('user/my-center/sign-in',{})
}


export const tasks =():Promise<API.IResult>=>{
    return  get('user/my-center/tasks')
}
