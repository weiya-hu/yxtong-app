//@ts-nocheck
import { Component } from 'react'

export default class WxLogin extends Component {
    componentDidMount() {
        var obj = new window.WxLogin({
            self_redirect: false,
            id: "wxLogin",
            appid: 'wx70dec1c67a586ee2',
            scope: "snsapi_login",
            redirect_uri: encodeURI('https://dev.yxtong.com/app/otherlogin'),
            state: "1",
            style: "",
            href: ""
        });
        // 监听页面地址栏url的改变 获取参数code
        window.onhashchange = () => {
        	//用一个方法拿到当前地址的参数
            console.log(123)
            console.log(window.location.href)
            // let params = util.getQueryParams(this.props.history.location.search);
            // // 扫码成功后地址栏会拼上一个code参数  
            // if (params.code || params['?code']) {
            //     let code = params.code ? params.code : params['?code']
            //     // 拿到参数去做你自己的操作
            //     //我们项目中是先调用一个接口来获取用户信息（后台提供），然后调用登录接口进入系统
            //     // .........
            // }
        }

    }
    render(){
        return (
            <div id='wxLogin' className='fleximg'></div>
        )
        
    }
    
}