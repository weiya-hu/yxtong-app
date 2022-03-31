import {get, post} from '../utils/request'
//用户信息
export const  userMycenterInfo= (): Promise<API.IResult> => {
    return get('user/public/uinfo.get')
}
//我的收益
export const integralRecord =(data):Promise<API.IResult>=>{
    return  post('user/center/integral/record.page',data)
}

//签到
export const signIn =():Promise<API.IResult>=>{
    return  post('user/singin.do',{})
}

//是否签到
export const isSignIns =():Promise<API.IResult>=>{
    return  get('user/singin/today.get')
}

//获取用户签到和所有任务
export const userTasks =():Promise<API.IResult>=>{
    return  get('user/tasks.list')
}

//数据分析数据总览
export const dataScreening =(data):Promise<API.IResult>=>{
    return  get('news/writing/dataScreening',data)
}

//用户管理
export const contentList =(data):Promise<API.IResult>=>{
    return  get('news/creation/article.page',data)
}

//oss上传图片
export const uploadPolicy =(data):Promise<API.IResult>=>{
    return  get('user/upload.sign',data)
}

//发布文章
export const newsPublish =(data):Promise<API.IResult>=>{
    return  post('news/creation/article/publish.do',data)
}

//保存文章
export const newsSave =(data):Promise<API.IResult>=>{
    return  post('news/creation/article.in',data)
}

//获取企业认证的状态和相关信息 
export const getAuditRecord =():Promise<API.IResult>=>{
    return  get('company/relation/audit.get')
}

//获取行业分类  
export const getIndustry =():Promise<API.IResult>=>{
    return  get('dim/industry.list')
}

//获取省市地区 
export const getGeo =():Promise<API.IResult>=>{
    return  get('dim/geo.list')
}

//保存个人认证信息
export const saveCompany =(data):Promise<API.IResult>=>{
    return  post('company/authentication.in',data)
}

//提交个人认证信息
export const submitCompany =(data):Promise<API.IResult>=>{
    return  post('company/authenticate.do',data)
}

//校验统一社会信用代码
export const checkCreditCode =(data):Promise<API.IResult>=>{
    return  post('company/code/check.do',data)
}

//获取用户今日积分
export const integralToday =(data):Promise<API.IResult>=>{
    return  get('user/center/integral/today.get',data)
}

