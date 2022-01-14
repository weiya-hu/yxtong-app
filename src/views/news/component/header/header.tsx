
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
  links:{}[]
  exitActive:boolean
  exitNone:boolean
  userInfo:API.IBgUser | any
  loginShow:boolean
}


class Header extends Component<any,HeaderState>{
  state={
    links:[
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
       {name:'药智谷',link:'https://gu.yaozh.com/'},
       {name:'药智搜',link:'https://nav.yaozh.com/'}
    ],
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
              {links.map((item,index)=><a target="_blank" href={item.link} className='link-item' key={index}>{item.name}</a>)}
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