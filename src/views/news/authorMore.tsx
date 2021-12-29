import { Component, ReactNode } from 'react'
import './authorMore.scss'
import Header from './component/header/header'
import FollowButton from './component/followButton/followButton'

import topimg from '../../public/images/user/top.jpg'

export default class AuthorMore extends Component{
    state={
        isLogin:true,//是否登录了
        exitNone:true,//退出登录是否显示
    }
    render(){
        const {isLogin,exitNone}=this.state
        return(
            <div className='authorMore'>
                <div className='more-header'>
                    <Header 
                        isLogin={isLogin} 
                        exitNone={exitNone} 
                        exitNoneFlag={(val)=>{this.setState({exitNone:val})}}
                    />
                </div>
                <div className='width'>
                    <div className='more-top'>
                        <div className='more-top-author flexb'>
                            <div className='flexl'>
                                <div className='fleximg more-headerimg'><img src='header' alt="header" /></div>
                                <div className='more-auther-name'>央视新闻</div>
                            </div>
                            <div>
                                <FollowButton item={{follow:false}} size='big'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}