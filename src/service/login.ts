import {get, post} from '../utils/request'

export const dologin =(data):Promise<API.IResult>=>{
    return  post('login/login.do','user',data)
}

export const captcha  =():Promise<API.IResult>=>{
    return  get('public/captcha.get','user')
}

export const sendSms =(data):Promise<API.IResult>=>{
    return  post('login/sms/send.do','user',data)
}

export const sendSmsreg =(data):Promise<API.IResult>=>{
    return  post('login/regsms/send.do','user',data)
}

export const getUser =():Promise<API.IResult>=>{
    return  get('public/uinfo.get','user')
}

export const doreg =(data):Promise<API.IResult>=>{
    return  post('login/register.do','user',data)
}


export const loginOut =():Promise<API.IResult>=>{
    return  get('login/out.do','user')
}

//微信扫码获取code后传后端
export const doWechat =(data):Promise<API.IResult>=>{
    return  post('login/wechat/callback.do','user',data)
}

//绑定手机号
export const doBindPhone =(data):Promise<API.IResult>=>{
    return  post('login/wechat/bind.do','user',data)
}

//获取微信登录二维码链接
export const wechatLink =(data):Promise<API.IResult>=>{
    return  get('login/wechat/qrinfo.get','user',data)
}

//重置密码发送短信
export const sendResetsms =(data):Promise<API.IResult>=>{
    return  post('login/resetsms/send.do','user',data)
}

//重置密码短信验证
export const checkResetsms =(data):Promise<API.IResult>=>{
    return  post('login/resetsms/check.do','user',data)
}

//重置密码
export const resetpass =(data):Promise<API.IResult>=>{
    return  post('login/resetpass/modify.do','user',data)
}

//强制登录
export const loginForceDo_api = (): Promise<any> => {
    return post('login/login/force.do' , 'user',{})
  }