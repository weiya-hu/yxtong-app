import { Component } from 'react'
import './user.scss'
import MyTask from './myTask'
import Profit from './profit'

import logoimg from '../../public/images/logo.png'
import homeimg from '../../public/images/user/home.png'
import exitimg from '../../public/images/user/exit.png'
import exitactiveimg from '../../public/images/user/exitactive.png'
import headerimg from '../../public/images/user/header.png'
import realnamedimg from '../../public/images/user/realnamed.png'
import phoneimg from '../../public/images/user/phone.png'


export default class User extends Component {
    state={
        nav:['我的任务','我的收益','创作中心','我的消息','设置'],
        navActiveIndex:1,//导航active的下标
        exitActive:false,//退出按钮是否hover
        exitNone:true,//退出登录是否显示
    }
    exitloginpre=(e)=>{
      e.stopPropagation()
      this.setState({exitNone:!this.state.exitNone})
    }
    exitlogin=(e)=>{
      e.stopPropagation()
    }

    render(){
        let nav = this.state.nav,navActiveIndex = this.state.navActiveIndex,exitActive = this.state.exitActive
        return <div id='user' onClick={()=>{this.setState({exitNone:true})}}>
          <div className='flextop'>
            <div className='usertop '>
                <div className='flexb'>
                    <div className='flexl cursor'>
                      <div className='homeimg fleximgtop'><img src={homeimg} alt="home" /></div>
                      <span className='colorw'>返回官网首页</span>
                    </div>
                    <div className='flexr cursor position' onClick={this.exitloginpre}>
                      <div className='headerimg fleximgtop'><img src={headerimg} alt="username" /></div>
                      <span className='colorw'>派大星叔叔</span>
                      <div 
                        className={this.state.exitNone?'fleximg exitnone exit':'fleximg exit'}
                        onClick={this.exitlogin}
                        onMouseEnter ={()=>{this.setState({exitActive:true})}} 
                        onMouseLeave ={()=>{this.setState({exitActive:false})}} >
                        <div className='fleximg exitimg'>
                          <img src={exitActive?exitactiveimg:exitimg} alt="exit" />
                        </div>
                        <span className={exitActive?'color':''}>退出</span>
                      </div>
                    </div>
                </div>
            </div>
            <div className='userNav'>
                <div className='flexl'>
                    <div className='fleximg logoimg cursor'>
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
          <div className='content'>
            <div className='flexbl width'>
              <div className='userinfo'>
                <div className='headerimg fleximg position'>
                  <img src={headerimg} alt="header" />
                  <div className='userlevel fleximg'><span>LV.1</span></div>
                </div>
                <div className='userphone'>1234567910</div>
                <div className='fleximg'>
                  <div className='fleximg realnamedimg'><img src={realnamedimg} alt="realnamed" /></div>
                  <div className='fleximg phoneimg'><img src={phoneimg} alt="realnamed" /></div>
                </div>
              </div>
              <div className='usermain'>
                {
                  navActiveIndex === 0 ? <MyTask /> :
                  navActiveIndex === 1 && <Profit />
                }
                
              </div>
            </div> 
          </div>
        </div>
    }
    
}