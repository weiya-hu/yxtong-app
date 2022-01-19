import { Divider } from 'antd'
import { Component } from 'react'
import { subComment } from '../../../../service/news'
import PopupLogin from '../../../login/popupLogin'
import './commentInput.scss'
import { Input } from 'antd';
import $message from '../../../component/message'

const { TextArea } = Input;


interface CommentInputState{
    size:string
    comment:(val:string)=>void
}

export default class CommentInput extends Component<CommentInputState> {
    state={
        isLogin:localStorage.getItem('userInfo'),
        loginShow:false,
        comment:''
    }
    textChange=(e)=>{
        this.setState({comment : e.target.value})
    }
    //点击评论按钮
    commentBt=async()=>{
        let id = window.location.href.split('=')[1]
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
            this.setState({
                loginShow:true
            })
        }
    }
    componentDidMount=async()=>{
      
    }
    render(){
        const {isLogin,loginShow,comment}=this.state
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
                请先<span onClick={()=>{this.setState({loginShow:true});document.body.style.overflow='hidden'}}>登录</span>在做评论~
            </div>
            }
            <div className='comment-button fleximg' onClick={this.commentBt}>评论</div>
            {loginShow && <PopupLogin show={(val)=>{this.setState({loginShow:val});document.body.style.overflow='auto'}}/>}
            
        </div>
    }
    
}