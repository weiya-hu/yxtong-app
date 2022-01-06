import { Divider } from 'antd'
import { Component } from 'react'
import { getUser } from '../../../../service/login'
import PopupLogin from '../../../login/popupLogin'
import './commentInput.scss'


interface CommentInputState{
    size:string
}

export default class CommentInput extends Component<CommentInputState> {
    state={
        isLogin:false,
        loginShow:false
    }
    componentDidMount=async()=>{
        const res = await getUser()
        if(res.status){//如果登录了
            this.setState({isLogin:true})
            
        }else{//没有登录
            this.setState({isLogin:false})
        }
    }
    render(){
        const {isLogin,loginShow}=this.state
        const {size}=this.props
        return <div className='CommentInput-component'>
            <div className='comment-txt'>评论</div>
            {size === 'small'?<div>
            {/* 小size */}

            </div>: (size === 'big' && isLogin)?<div>
            {/* 登录后大size */}
 
            </div>:<div className='unlogin-input fleximg'>
            {/* 没有登录大size */}
                请先<span onClick={()=>{this.setState({loginShow:true});document.body.style.overflow='hidden'}}>登录</span>在做评论~
            </div>
            }
            <div className='comment-button fleximg'>评论</div>
            {loginShow && <PopupLogin show={(val)=>{this.setState({loginShow:val});document.body.style.overflow='auto'}}/>}
        </div>
    }
    
}