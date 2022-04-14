import {get, post} from '../utils/request'

export const dologin =(data):Promise<API.IResult>=>{
    return  post('login/login.do',data)
}

export const captcha  =():Promise<API.IResult>=>{
    return  get('user/public/captcha.get')
}

export const sendSms =(data):Promise<API.IResult>=>{
    return  post('login/sms/send.do',data)
}

export const sendSmsreg =(data):Promise<API.IResult>=>{
    return  post('login/regsms/send.do',data)
}

export const getUser =():Promise<API.IResult>=>{
    return  get('user/public/uinfo.get')
}

export const doreg =(data):Promise<API.IResult>=>{
    return  post('login/register.do',data)
}


export const loginOut =():Promise<API.IResult>=>{
    return  get('login/out.do')
}

//微信扫码获取code后传后端
export const doWechat =(data):Promise<API.IResult>=>{
    return  post('login/wechat/callback.do',data)
}

//绑定手机号
export const doBindPhone =(data):Promise<API.IResult>=>{
    return  post('login/wechat/bind.do',data)
}

//获取微信登录二维码链接
export const wechatLink =(data):Promise<API.IResult>=>{
    return  get('login/wechat/qrinfo.get',data)
}

//重置密码发送短信
export const sendResetsms =(data):Promise<API.IResult>=>{
    return  post('login/resetsms/send.do',data)
}

//重置密码短信验证
export const checkResetsms =(data):Promise<API.IResult>=>{
    return  post('login/resetsms/check.do',data)
}

//重置密码
export const resetpass =(data):Promise<API.IResult>=>{
    return  post('login/resetpass/modify.do',data)
}