import {get, post} from '../utils/request'
//用户信息
export const  userMycenterInfo= (): Promise<API.IResult> => {
    return get('user/my-center/info')
}
//我的收益
export const integralRecord =(data):Promise<API.IResult>=>{
    return  post('user/my-center/integral-record',data)
}

//签到
export const signIn =():Promise<API.IResult>=>{
    return  post('user/singin',{})
}

//是否签到
export const isSignIns =():Promise<API.IResult>=>{
    return  get('user/is-singin')
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

//发布文章
export const newsPublish =(data):Promise<API.IResult>=>{
    return  post('news/writing/publish',data)
}

//获取企业认证的状态和相关信息 
export const getAuditRecord =():Promise<API.IResult>=>{
    return  get('company/get-audit-record')
}

//获取行业分类  
export const getIndustry =():Promise<API.IResult>=>{
    return  get('dim/get-industry')
}

//获取省市地区 
export const getGeo =():Promise<API.IResult>=>{
    return  get('dim/get-geo')
}

//保存个人认证信息
export const saveCompany =(data):Promise<API.IResult>=>{
    return  post('company/save-company',data)
}

//提交个人认证信息
export const submitCompany =(data):Promise<API.IResult>=>{
    return  post('company/submit-company',data)
}