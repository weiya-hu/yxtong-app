
import { Component} from 'react'
import './header.scss'
import { getUser } from '../../../../service/login'
import PopupLogin from '../../../login/popupLogin'
import { withRouter } from 'react-router-dom';
import { loginOut } from '../../../../service/login';

import headerimg from '../../../../public/images/user/header.png'
import exitimg from '../../../../public/images/user/exit.png'
import exitactiveimg from '../../../../public/images/user/exitactive.png'

 
interface HeaderState{
  links:string[]
  exitActive:boolean
  exitNone:boolean
  userInfo:API.IBgUser | any
  loginShow:boolean
}


class Header extends Component<any,HeaderState>{
  state={
    links:['药智网','产业大脑','药智资讯','药智人才','专利通','药智汇','药智通','智慧大讲堂','论坛交流','俱乐部','海外智通','药智谷','药智搜','PDI峰会'],
    exitActive:false,//退出按钮是否hover
    exitNone:false,//退出登录是否显示
    userInfo:null,
    loginShow:false
  }
  //退出登录
  exitlogin=async(e)=>{
    e.stopPropagation()
    let res = await loginOut()
    if(res.status){
      this.props.history.push('/app/login?url=/app/news')
      localStorage.removeItem('userInfo')
    }
    
  }
  tologin=()=>{
    this.props.history.push('/app/login?url=/app/news')
  }
  componentDidMount=()=>{
    let userInfo=JSON.parse(localStorage.getItem('userInfo')) 
    if(userInfo){
      this.setState({userInfo:userInfo})
    }
  }
  render(){
    let {links,exitActive,userInfo,loginShow,exitNone}=this.state
    return (
      <div className='header' >
        <div className='width flexb'>
          <div className='linkspre'>
            <div className='flexl links'>
              {links.map((item,index)=><a className='link-item' key={index}>{item}</a>)}
            </div>
          </div>
          {userInfo?(
            <div className='flexr'>
              <div className='colorw position'>消息
                {/* <div className='message-num fleximg'><span>99</span></div> */}
              </div>
              <div className='news-login-line'></div>
              <div className='flexr position user-login'  
                onClick={()=>{this.props.history.push('/app/user')}}
                onMouseEnter ={()=>{this.setState({exitNone:true})}} 
                onMouseLeave ={()=>{this.setState({exitNone:false})}} 
              >
                <div className='fleximg headerimg'><img src={headerimg} alt="header" /></div>
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
              <div className='news-login' onClick={ this.tologin}>登录</div>

              <div className='news-login-line'></div>
              <div className='colorw'>注册</div>
            </div>
          )}  
        </div>
        <div className='invite '>你好，欢迎登录康州数智官网！</div>
        {loginShow &&  <PopupLogin 
            show={(val)=>{this.setState({loginShow:val});document.body.style.overflow='auto'}}
            userInfo={(val)=>{this.setState({userInfo:val});this.props.userInfo(val)}}
        />} 
      </div>
    )
  }
}
export default withRouter(Header)