
import { Component} from 'react'
import './header.scss'
import { withRouter } from 'react-router-dom';
import { loginOut } from 'service/login';

import store from 'store';
import {removeUserInfo, loginShow} from 'store/actionCreators'


import headerimg from 'public/images/user/header.png'
import exitimg from 'public/images/user/exit.png'
import exitactiveimg from 'public/images/user/exitactive.png'

 
interface HeaderState{
  links:{}[]
  exitActive:boolean
  exitNone:boolean
  userInfo:API.IBgUser | any
}


class Header extends Component<any,HeaderState>{
  state={
    links:[
      {name:'药智器械',link:'https://qx.yaozh.com/login'},
       {name:'药智人才',link:'https://job.yaozh.com/'},
       {name:'专利通',link:'https://patent.yaozh.com/'},
       {name:'药智咨询',link:'https://report.yaozh.com/'},
       {name:'药智汇',link:'https://www.yaozh.com/zhihui/?yaozh'},
       {name:'药智通',link:'https://s.yaozh.com'},
       {name:'药智大讲堂',link:'https://edu.yaozh.com/'},
       {name:'产业大脑',link:'https://aiyun.yaozh.com/'},
       {name:'论坛交流',link:'https://bbs.yaozh.com'},
       {name:'俱乐部',link:'https://club.yaozh.com/'},
       {name:'海外智通',link:'https://www.yaohaiwai.com/'},
       {name:'药智谷',link:'https://gu.yaozh.com/'}
      //  {name:'药智搜',link:'https://nav.yaozh.com/'}
    ],
    exitActive:false,//退出按钮是否hover
    exitNone:false,//退出登录是否显示
    userInfo:null,
  }
  //退出登录
  exitlogin=async(e)=>{
    e.stopPropagation()
    let res = await loginOut()
    if(res.status){
      // this.props.history.push('/app/login?url=/app/news')
      store.dispatch(removeUserInfo())
      this.setState({userInfo:null})
    }
  }
  //去登录页面
  tologin=()=>{
    // this.props.history.push('/app/login?url=/app/news')
    store.dispatch(loginShow())
    this.forceUpdate()
  }
  //去注册页面
  toRegister=()=>{
    this.props.history.push('/app/register/register')
  }
  componentDidMount=()=>{
    let userInfo=store.getState().userInfo
    if(userInfo){
      this.setState({userInfo:userInfo})
    }
  }
  render(){
    let {links,exitActive,exitNone,}=this.state
    let userInfo = store.getState().userInfo
    return (
      <div className='header position' >
        <div className='width flexb'>
          <div className='linkspre'>
            <div className='flexl links'>
              <div onClick={()=>{window.location.href='/'}}>
                <a className='link-item' >首页</a> 
              </div> 
              {links.map((item,index:number)=>
                <div key={index}>
                  <a target="_blank" href={item.link} className='link-item' >{item.name}</a> 
                  {index===0 && <span className='hot-txt'>【热】</span> }
                </div> 
                
              )}
              
            </div>
          </div>
          {userInfo?(
            <div className='flexr'>
              <div className='colorw position'>消息
                {/* <div className='message-num fleximg'><span>99</span></div> */}
              </div>
              <div className='news-login-line'></div>
              <div className='flexr position user-login pointer'  
                onClick={()=>{this.props.history.push('/app/user')}}
                onMouseEnter ={()=>{this.setState({exitNone:true})}} 
                onMouseLeave ={()=>{this.setState({exitNone:false})}} 
              >
                <div className='fleximg headerimg'><img src={userInfo.head || headerimg} alt="header" /></div>
                <div className='name'>{userInfo.name}</div>
                <div 
                  className={exitNone?'fleximg  exit':'fleximg exitnone exit'}
                  onClick={this.exitlogin}
                  onMouseEnter ={()=>{this.setState({exitActive:true})}} 
                  onMouseLeave ={()=>{this.setState({exitActive:false})}} 
                >
                  <div className='fleximg exitimg'>
                    <img src={exitActive?exitactiveimg:exitimg} alt="exit" />
                  </div>
                  <span className={exitActive?'color':''}>退出</span>
                  <div className='posi-more'></div>
                </div>
              </div>
            </div>
          ):(<div className='flexr'>
              {/* <div className='news-login' onClick={()=>{this.setState({loginShow:true})}}>登录</div> */}
              <div className='news-login pointer' onClick={ this.tologin}>登录</div>

              <div className='news-login-line'></div>
              <div className='colorw pointer'  onClick={ this.toRegister}>注册</div>
            </div>
          )}  
        </div>
        <div className='invite '>你好，欢迎登录康洲数智官网！</div>
      </div>
    )
  }
}
export default withRouter(Header)
