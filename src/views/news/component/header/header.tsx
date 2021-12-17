//@ts-nocheck
import { Component} from 'react'
import './header.scss'

import headerimg from '../../../../public/images/user/header.png'
import exitimg from '../../../../public/images/user/exit.png'
import exitactiveimg from '../../../../public/images/user/exitactive.png'

export default class Header extends Component{
  state={
    links:['药智网','产业大脑','药智资讯','药智人才','专利通','药智汇','药智通','智慧大讲堂','论坛交流','俱乐部','海外智通','药智谷','药智搜','PDI峰会'],
    exitActive:false,//退出按钮是否hover
    exitNone:true,//退出登录是否显示

  }
  exitloginpre=(e)=>{
    e.stopPropagation()
    this.props.exitNoneFlag(!this.props.exitNone)
  }
  exitlogin=(e)=>{
    e.stopPropagation()
  }
  render(){
    let links=this.state.links,exitActive = this.state.exitActive,exitNoneProps=this.props.exitNone
    return (
      <div className='header' onClick={this.exitloginpre}>
        <div className='width flexb'>
          <div className='linkspre'>
            <div className='flexl links'>
              {links.map((item,index)=><a className='link-item' key={index}>{item}</a>)}
            </div>
          </div>
          {this.props.isLogin?(
            <div className='flexr'>
              <div className='colorw position'>消息
                <div className='message-num fleximg'><span>99</span></div>
              </div>
              <div className='news-login-line'></div>
              <div className='flexr position'  onClick={this.exitloginpre}>
                <div className='fleximg headerimg'><img src={headerimg} alt="header" /></div>
                <div className='name'>派大星叔叔</div>
                <div 
                  className={exitNoneProps?'fleximg exitnone exit':'fleximg exit'}
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