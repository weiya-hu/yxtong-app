
import { Component} from 'react'
import './header.scss'
import { getUser } from '../../../../service/login'

import headerimg from '../../../../public/images/user/header.png'
import exitimg from '../../../../public/images/user/exit.png'
import exitactiveimg from '../../../../public/images/user/exitactive.png'


interface HeaderProps{
  isLogin:boolean;
  exitNone:boolean;
  exitNoneFlag:(val:boolean)=>void
}
 
interface HeaderState{
  links:string[]
  exitActive:boolean
  exitNone:boolean
  userInfo:API.IBgUser | any
}


export default class Header extends Component<HeaderProps,HeaderState>{
  state={
    links:['药智网','产业大脑','药智资讯','药智人才','专利通','药智汇','药智通','智慧大讲堂','论坛交流','俱乐部','海外智通','药智谷','药智搜','PDI峰会'],
    exitActive:false,//退出按钮是否hover
    exitNone:true,//退出登录是否显示
    userInfo:null
  }
  exitloginpre=(e)=>{
    e.stopPropagation()
    this.props.exitNoneFlag(!this.props.exitNone)
  }
  exitlogin=(e)=>{
    e.stopPropagation()
  }
  componentDidMount=async()=>{
      let userInfo =JSON.parse(localStorage.getItem('userInfo')) 
      let isLogin =  localStorage.getItem('isLogin')
      if(!isLogin){
        const res= await getUser()
        if(res.status){
          localStorage.setItem('userInfo',JSON.stringify(res.body))
          localStorage.setItem('isLogin','1')
          userInfo = res.body
        }
      }
      this.setState({userInfo:userInfo})
  }
  render(){
    let {links,exitActive,userInfo}=this.state
    let {exitNone}=this.props
    return (
      <div className='header' onClick={this.exitloginpre}>
        <div className='width flexb'>
          <div className='linkspre'>
            <div className='flexl links'>
              {links.map((item,index)=><a className='link-item' key={index}>{item}</a>)}
            </div>
          </div>
          {userInfo?(
            <div className='flexr'>
              <div className='colorw position'>消息
                <div className='message-num fleximg'><span>99</span></div>
              </div>
              <div className='news-login-line'></div>
              <div className='flexr position'  onClick={this.exitloginpre}>
                <div className='fleximg headerimg'><img src={headerimg} alt="header" /></div>
                <div className='name'>{userInfo.name}</div>
                <div 
                  className={exitNone?'fleximg exitnone exit':'fleximg exit'}
                  onClick={this.exitlogin}
                  onMouseEnter ={()=>{this.setState({exitActive:true})}} 
                  onMouseLeave ={()=>{this.setState({exitActive:false})}} 
                >
                  <div className='fleximg exitimg'>
                    <img src={exitActive?exitactiveimg:exitimg} alt="exit" />
                  </div>
                  <span className={exitActive?'color':''}>退出</span>
                </div>
              </div>
            </div>
          ):(<div className='flexr'>
              <div className='news-login'>登录</div>
              <div className='news-login-line'></div>
              <div className='colorw'>注册</div>
            </div>
          )}  
        </div>
        <div className='invite '>你好，欢迎登录康州数智官网！</div>
      </div>
    )
  }
}