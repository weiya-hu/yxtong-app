import {get, post} from '../utils/request'
//用户信息
export const  userMycenterInfo= (): Promise<API.IResult> => {
    return get('public/uinfo.get','user')
}
//我的收益
export const integralRecord =(data):Promise<API.IResult>=>{
    return  post('user/center/integral/record.page','user',data)
}

//签到
export const signIn =():Promise<API.IResult>=>{
    return  post('user/singin.do','user',{})
}

//是否签到
export const isSignIns =():Promise<API.IResult>=>{
    return  get('user/singin/today.get','user')
}

//获取用户签到和所有任务
export const userTasks =():Promise<API.IResult>=>{
    return  get('user/tasks.list','user')
}

//数据分析数据总览
export const dataScreening =(data):Promise<API.IResult>=>{
    return  get('news/writing/dataScreening','official',data)
}

//用户管理
export const contentList =(data):Promise<API.IResult>=>{
    return  get('news/creation/article.page','official',data)
}

//oss上传图片
export const uploadPolicy =(data):Promise<API.IResult>=>{
    return  get('user/upload.sign','user',data)
}

//发布文章
export const newsPublish =(data):Promise<API.IResult>=>{
    return  post('news/creation/article/publish.do','official',data)
}

//保存文章
export const newsSave =(data):Promise<API.IResult>=>{
    return  post('news/creation/article.in','official',data)
}

//获取企业认证的状态和相关信息 
export const getAuditRecord =():Promise<API.IResult>=>{
    return  get('company/relation/audit.get','user')
}

//获取行业分类  
export const getIndustry =():Promise<API.IResult>=>{
    return  get('dim/industry.list','user')
}

//获取省市地区 
export const getGeo =():Promise<API.IResult>=>{
    return  get('dim/geo.list','user')
}

//保存个人认证信息
export const saveCompany =(data):Promise<API.IResult>=>{
    return  post('company/authentication.in','user',data)
}

//提交个人认证信息
export const submitCompany =(data):Promise<API.IResult>=>{
    return  post('company/authenticate.do','user',data)
}

//校验统一社会信用代码
export const checkCreditCode =(data):Promise<API.IResult>=>{
    return  post('company/code/check.do','user',data)
}

//获取用户今日积分
export const integralToday =(data):Promise<API.IResult>=>{
    return  get('user/center/integral/today.get','user',data)
}

//获取用户粉丝数
export const userFans =(data):Promise<API.IResult>=>{
    return  get('user/team/fans.list','user',data)
}

//获取会员全类信息
export const memberLists =():Promise<API.IResult>=>{
    return  get('public/member.list','user')
}

//获取团队(人数)
export const teamCount =():Promise<API.IResult>=>{
    return  get('user/team/count.get','user')
}

//获取直推（人数）
export const teamDirect =():Promise<API.IResult>=>{
    return  get('user/team/direct/recommend/count.get','user')
}

//获取间推（人数）
export const teamIndirect =():Promise<API.IResult>=>{
    return  get('user/team/indirect/recommend/count.get','user')
}

//获取直推或间推用户列表
export const teamLists =(data):Promise<API.IResult>=>{
    return  get('user/team/recommend.list','user',data)
}

//获取软文详情
export const promoteArticle =(data):Promise<API.IResult>=>{
    return  get('user/promote/article.get','user',data)
}

//分享获取软文详情
export const promoteArticleh5 =(data):Promise<API.IResult>=>{
    return  get('user/public/promote/article.get','user',data)
}

//获取推广行业分类
export const promoteIndustry =():Promise<API.IResult>=>{
    return  get('user/promote/industry.list','user')
}

//获取软文分页列表
export const promoteArticlePage =(data):Promise<API.IResult>=>{
    return  get('user/promote/article.page','user',data)
}

//获取用户积分记录分页列表
export const promoteIntegral =(data):Promise<API.IResult>=>{
    return  get('user/promote/integral/record.page','user',data)
}

//获取海报分页列表
export const promotePosterPage =(data):Promise<API.IResult>=>{
    return  get('user/promote/poster.page','user',data)
}

//下载海报
export const promotePosterDownload =(data):Promise<API.IResult>=>{
    return  post('user/promote/poster/download.do','user',data)
}