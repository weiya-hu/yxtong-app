//@ts-nocheck
import { Component } from 'react'

interface WxLoginProps{
    url?:string,
    state?:string,
    appid:string,
}
export default class WxLogin extends Component<any,WxLoginProps> {
    componentDidMount() {
        const {url,state,appid} =this.props
        console.log(url,state,appid)
        var obj = new window.WxLogin({
            self_redirect: false,
            id: "wxLogin",
            appid: appid,
            scope: "snsapi_login",
            redirect_uri: url,
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