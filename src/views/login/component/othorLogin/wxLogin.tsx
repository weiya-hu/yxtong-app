//@ts-nocheck
import { Component } from 'react'

interface WxLoginProps{
    url?:string,
    state?:string
}
export default class WxLogin extends Component<any,WxLoginProps> {
    componentDidMount() {
        const {url,state} =this.props
        var obj = new window.WxLogin({
            self_redirect: false,
            id: "wxLogin",
            appid: 'wx70dec1c67a586ee2',
            scope: "snsapi_login",
            redirect_uri: encodeURI(url),
            state: state,
            style: "",
            href: ""
        });
    }
    render(){
        return (
            <div id='wxLogin' className='fleximg'></div>
        )
        
    }
    
}