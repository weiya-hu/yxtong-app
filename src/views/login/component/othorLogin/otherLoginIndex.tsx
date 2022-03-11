//@ts-nocheck
import { Component } from 'react'
import {util} from 'utils/news'
import {doWechat} from 'service/login'

export default class OtherLoginIndex extends Component {
    
    componentDidMount(){
        console.log(window.location.href)
        let code = util.getUrlParam('code')
        console.log(code)
        doWechat({code:code}).then(res=>{
            if(res.status){
                window.location.href='/'
            }else{
                if(res.errno === 10200 ){
                    let url = '/app/bindphone?nickname='+res.body.nickname+'&headimgurl='+res.body.headimgurl
                    this.props.history.push(url);
                }
            }
        })
    }
    render(){
        return <div className='otherLoginIndex'></div>
    }
   
    
}