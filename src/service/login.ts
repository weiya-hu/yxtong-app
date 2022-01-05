import {get, post} from '../utils/request'

export const doLogin = ( ): Promise<any> => {
    return get('login/token')
}