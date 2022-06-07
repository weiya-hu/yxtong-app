//@ts-nocheck
import { Component } from 'react'
import {util} from 'utils/news'
import {doWechat, loginForceDo_api} from 'service/login'
import { Base64 } from 'js-base64';

export default class OtherLoginIndex extends Component {
    
    componentDidMount(){
        let code = util.getUrlParam('code'),state= util.getUrlParam('state')
        doWechat({code,state}).then(res=>{
            if(res.status){
                window.location.href=decodeURIComponent(util.getUrlParam('url'))
            }else{
                if(res.errno === 10201 ){
                    let url = '/app/bindphone?nickname='+res.body.nickname+'&headimgurl='+res.body.headimgurl
                    this.props.history.push(url);
                }else if (res.errno === 10200) {
                    loginForceDo_api().then(result=>{
                        result.status && (() => {
                            let url =util.getUrlParam('url')
                            window.location.href = url ? decodeURIComponent(url).replace(/\'/g, "") : '/'
                        })()
                    })
                    
                }
            }
        })
    }
    render(){
        return <div className='otherLoginIndex'></div>
    }
   
    
}