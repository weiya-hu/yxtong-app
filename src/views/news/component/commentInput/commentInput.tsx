import { Divider } from 'antd'
import { Component } from 'react'
import './commentInput.scss'

interface CommentInputState{
    size:string
}

export default class CommentInput extends Component<CommentInputState> {
    state={
        isLogin:false
    }
    render(){
        const {isLogin}=this.state
        const {size}=this.props
        return <div className='CommentInput-component'>
            <div className='comment-txt'>评论</div>
            {size === 'small'?<div>
            {/* 小size */}

            </div>: (size === 'big' && isLogin)?<div>
            {/* 登录后大size */}
 
            </div>:<div className='unlogin-input fleximg'>
            {/* 没有登录大size */}
                请先<span>登录</span>在做评论~
            </div>
            }
            <div className='comment-button fleximg'>评论</div>
        </div>
    }
    
}