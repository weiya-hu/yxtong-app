//@ts-nocheck
import { Component } from 'react'

export default class WxLogin extends Component {
    componentDidMount() {
        var obj = new window.WxLogin({
            self_redirect: false,
            id: "wxLogin",
            appid: 'wx70dec1c67a586ee2',
            scope: "snsapi_login",
            redirect_uri: encodeURI('http://dev.yxtong.com/app/otherlogin'),
            state: "1",
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