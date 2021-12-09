import {get, post} from '../utils/request'

export const doLogin = (data:API.IDoLoginParams): Promise<any> => {
    return post('/login/do_login', data)
}