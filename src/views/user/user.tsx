import { Component } from 'react'
import './user.scss'
import MyScore from './component/myScore'
import CommonButton from './component/commonButton'
import Task from './component/task'

import logoimg from '../../public/images/logo.png'
import homeimg from '../../public/images/user/home.png'
import exitimg from '../../public/images/user/exit.png'
import exitactiveimg from '../../public/images/user/exitactive.png'
import headerimg from '../../public/images/user/header.png'
import realnamedimg from '../../public/images/user/realnamed.png'
import phoneimg from '../../public/images/user/phone.png'
import signinimg from '../../public/images/user/signin.png'
import signinedimg from '../../public/images/user/signined.png'
import score7img from '../../public/images/user/score7.png'
import emailimg from '../../public/images/user/email.png'


export default class User extends Component {
    state={
        nav:['我的任务','我的收益','创作中心','我的消息','设置'],
        navActiveIndex:0,//导航active的下标
        exitActive:false,//退出按钮是否hover
        exitNone:true,//退出登录是否显示
        isSignin:false,//是否签到
        signinDay:2,//签到天数
        signArr:[1,2,3,4,5,6]
    }
    exitloginpre=(e)=>{
      e.stopPropagation()
      this.setState({exitNone:!this.state.exitNone})
    }
    exitlogin=(e)=>{
      e.stopPropagation()
    }
    doperfect=(val)=>{
      console.log(val)
    }
    render(){
        let nav = this.state.nav,navActiveIndex = this.state.navActiveIndex,exitActive = this.state.exitActive
        let isSignin = this.state.isSignin,signinDay=this.state.signinDay
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
                <MyScore/>
                <div className='signin'>
                  <div className='flexb title'>
                    <span>惊喜福利</span>
                    <div
                      className={isSignin?'signined-button':'signin-button fleximg'}
                      >{isSignin?`已连续签到2天`:'签到'}</div>
                  </div>
                  <div className='font12'>连续7天、14天、30天签到额外赠送积分</div>
                  <div className='flexb sign-arr'>
                    {this.state.signArr.map((val)=>(
                      <div className={(val <=signinDay)?'scored score':'score'}>
                        <div className='fleximg signimg'><img src={(val <=signinDay)?signinedimg:signinimg} alt="signin" /></div>
                        <div>+100积分</div>
                      </div>
                      ))}
                  </div>
                  <div className='score-7 fleximg position'>
                    <div className='fleximg score7img'><img src={score7img} alt="score" /></div>
                    <div className='font12'>+100积分，额外赠送500积分</div>   
                    <div className='surprise fleximg'><span className=''>惊喜大奖</span> </div>
                  </div>
                </div>
                <div className='task'>
                  <div className='task-title'>新手任务积分</div>
                  <div className='flexb task-item'>
                    <div className='flexl'>
                      <div className='fleximg emailimg'><img src={emailimg} alt="email" /></div>
                      <Task title='完成邮箱安全认证' score='+200积分' />
                    </div>
                    <div>
                      <CommonButton onclicked={this.doperfect} isBefore={true} wordBefore='去完善' wordAfter='已完善'/>
                    </div>
                  </div> 
                  <div className='flexb task-item'>
                    <div className='flexl'>
                      <div className='fleximg emailimg'><img src={emailimg} alt="email" /></div>
                      <Task title='完成邮箱安全认证' score='+200积分' />
                    </div>
                    <div>
                      <CommonButton onclicked={this.doperfect} isBefore={true} wordBefore='去完善' wordAfter='已完善'/>
                    </div>
                  </div>
                  <div className='flexb task-item'>
                    <div className='flexl'>
                      <div className='fleximg emailimg'><img src={emailimg} alt="email" /></div>
                      <Task title='完成邮箱安全认证' score='+200积分' />
                    </div>
                    <div>
                      <CommonButton onclicked={this.doperfect} isBefore={true} wordBefore='去完善' wordAfter='已完善'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='ggao'>
                <img src={realnamedimg} alt="广告" />
              </div>
            </div>
            
          </div>
          
        </div>
    }
    
}