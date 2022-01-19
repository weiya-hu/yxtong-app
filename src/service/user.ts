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


//签到
export const signIn =():Promise<API.IResult>=>{
    return  post('user/singin',{})
}

//是否签到
export const isSignIn =():Promise<API.IResult>=>{
    return  get('user/is-singin')
}

export const tasks =():Promise<API.IResult>=>{
    return  get('user/my-center/tasks')
}

//获取用户签到和所有任务

export const userTasks =():Promise<API.IResult>=>{
    return  get('user/tasks')
}
//数据分析数据总览
export const dataScreening =(data):Promise<API.IResult>=>{
    return  get('news/writing/dataScreening',data)
}
//用户管理

export const contentList =(data):Promise<API.IResult>=>{
    return  get('news/writing/contentList',data)
}

//oss上传图片
export const uploadolicy =():Promise<API.IResult>=>{
    return  get('user/upload-policy')
}