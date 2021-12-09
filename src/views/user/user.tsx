import { Component } from 'react'
import './user.scss'

import logoimg from '../../public/images/logo.png'
import homeimg from '../../public/images/user/home.png'
import exitimg from '../../public/images/user/exit.png'
import exitactiveimg from '../../public/images/user/exitactive.png'
import headerimg from '../../public/images/user/header.png'


export default class User extends Component {
    state={
        nav:['我的任务','我的收益','创作中心','我的消息','设置'],
        navActiveIndex:0,//导航active的下标
    }
    render(){
        let nav = this.state.nav,navActiveIndex = this.state.navActiveIndex
        return <div id='user'>
          <div className='flextop'>
            <div className='usertop '>
                <div className='flexb'>
                    <div className='flexl'>
                      <div className='homeimg fleximgtop'><img src={homeimg} alt="home" /></div>
                      <span>返回官网首页</span>
                    </div>
                    <div className='flexl'>
                      <div className='headerimg fleximgtop'><img src={headerimg} alt="username" /></div>
                      <span>派大星叔叔</span>
                      <div>
                        
                      </div>
                    </div>
                </div>
            </div>
            <div className='userNav'>
                <div className='flexl'>
                    <div className='fleximg logoimg'>
                        <img src={logoimg} alt="logo" />
                    </div>
                    <div className='line'></div>
                    <div className='flexl navitems'>
                        {nav.map((item,index)=>(
                            <div 
                              key={index}
                              className={navActiveIndex === index?'fleximg navactive':'fleximg'}
                              onClick={()=>{this.setState({navActiveIndex:index})}}
                            >{item}</div>                            
                        ))}
                    </div>                    
                </div>
            </div>
          </div>
        </div>
    }
    
}