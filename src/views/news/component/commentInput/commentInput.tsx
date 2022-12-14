import { Divider } from 'antd'
import { Component } from 'react'
import { subComment } from 'service/news'
import './commentInput.scss'
import { Input } from 'antd';
import $message from 'views/component/message'
import {util} from 'utils/news'

import store from 'store';
import {loginShow} from 'store/actionCreators'

const { TextArea } = Input;


interface CommentInputState{
    size:string
    comment:(val:string)=>void
}

export default class CommentInput extends Component<CommentInputState> {
    state={
        isLogin:store.getState().userInfo,
        loginShow:false,
        comment:''
    }
    textChange=(e)=>{
        this.setState({comment : e.target.value})
    }
    //点击评论按钮
    commentBt=async()=>{
        let userInfo = store.getState().userInfo
        if(userInfo){
            // let url = window.location.href
            // let id=url.substring(url.indexOf('=')+1,url.length)
            let {comment} =this.state
            if(comment){
                let id = util.getUrlParam('newsId')
                let data={
                    "content": this.state.comment,
                    "news_id": id
                }
                const res =await subComment(data)
                if(res.status){
                    this.props.comment(res.body)
                    this.setState({comment:''})
                    
                }else if(res.errno === 10620){
                    $message.info('身份认证过期，请先登录后再试')
                    store.dispatch(loginShow())
                }
            }else{
                $message.info('请输入评论')
            }
        }else{
            store.dispatch(loginShow())
        }
        
    }
    componentDidMount=async()=>{
      
    }
    render(){
        const {isLogin,comment}=this.state
        const {size}=this.props
        return <div className='CommentInput-component'>
            <div className='comment-txt'>评论</div>
            {size === 'small'?<div className='login-textare login-textare-small'>
            {/* 小size */}
                <TextArea 
                    placeholder='说点什么吧~'
                    autoSize={false}
                    showCount 
                    maxLength={150} 
                    style={{ height: 120 ,background: '#F4F4F4'}} 
                    onChange={this.textChange} 
                />
            </div>: (size === 'big' && isLogin)?<div className='login-textarea'>
            {/* 登录后大size */}
                <TextArea 
                    placeholder='说点什么吧~'
                    autoSize={false}
                    showCount 
                    maxLength={150} 
                    style={{ height: 100 ,background: '#F4F4F4'}} 
                    onChange={this.textChange} 
                    value={comment}
                />
            </div>:<div className='unlogin-input fleximg'>
            {/* 没有登录大size */}
                请先<span onClick={()=>{store.dispatch(loginShow())}}>登录</span>再做评论~
            </div>
            }
            <div className='comment-button fleximg pointer' onClick={this.commentBt}>评论</div>
            
        </div>
    }
    
}