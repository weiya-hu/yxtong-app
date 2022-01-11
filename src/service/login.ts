import {get, post} from '../utils/request'

export const token = (): Promise<API.IResult> => {
    return get('user/public/token')
}

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
    return  post('/login/doreg',data)
}