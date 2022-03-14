import {get, post} from '../utils/request'

export const dologin =(data):Promise<API.IResult>=>{
    return  post('login/dologin',data)
}

export const captcha  =():Promise<API.IResult>=>{
    return  get('user/public/captcha')
}

export const sendSms =(data):Promise<API.IResult>=>{
    return  post('login/send-sms',data)
}

export const sendSmsreg =(data):Promise<API.IResult>=>{
    return  post('login/send-sms-reg',data)
}

export const getUser =():Promise<API.IResult>=>{
    return  get('user/public/get-user')
}

export const doreg =(data):Promise<API.IResult>=>{
    return  post('login/doreg',data)
}


export const loginOut =():Promise<API.IResult>=>{
    return  get('login/login-out')
}

//微信扫码获取code后传后端
export const doWechat =(data):Promise<API.IResult>=>{
    return  post('login/wechat/callback',data)
}

//绑定手机号
export const doBindPhone =(data):Promise<API.IResult>=>{
    return  post('login/wechat/bind.do',data)
}

//获取微信登录二维码链接
export const wechatLink =(data):Promise<API.IResult>=>{
    return  get('login/wechat/qrinfo',data)
}

