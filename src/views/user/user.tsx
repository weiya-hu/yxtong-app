//@ts-nocheck
import { Component } from 'react'
import './user.scss'
import MyTask from './myTask'
import Profit from './profit'
import Writing from './writing'
import ArticleList from './articleList'
import DataAnalysis from './dataAnalysis'
import ArticleDetail from './articleDetail'
import {loginOut } from 'service/login'
import { getUser } from 'service/login'
import { Redirect ,withRouter} from 'react-router-dom';

import store from "store/index";
import { removeUserInfo} from "store/actionCreators.js";

import logoimg from 'public/images/logo.png'
import homeimg from 'public/images/user/home.png'
import exitimg from 'public/images/user/exit.png'
import exitactiveimg from 'public/images/user/exitactive.png'
import headerimg from 'public/images/user/header.png'
import realnamedimg from 'public/images/user/realnamed.png'
import phoneimg from 'public/images/user/phone.png'

class User extends Component {
    state={
        nav:['我的任务','我的收益','创作中心','我的消息','设置'],
        // aside:[['我的任务'],['积分明细'],['发布文章','内容管理','数据分析'],['我的消息'],['设置']],
        aside:[['我的任务'],['积分明细'],['发布文章','内容管理'],['我的消息'],['设置']],

        navActiveIndex:0,//导航active的下标
        asideActive:0,//侧边栏active的下标
        isArticleDetail:0,//是否是详情页
        exitActive:false,//退出按钮是否hover
        exitNone:true,//退出登录是否显示
        userInfo:{},
        loginFlag:false,
        newsDetail:{},//文章详情
        editItem:null
    }
    exitloginpre=(e)=>{
      e.stopPropagation()
      this.setState({exitNone:!this.state.exitNone})
    }
    //返回登录
    exitlogin=async(e)=>{
      e.stopPropagation()
      let res = await loginOut()
      if(res.status){
        this.props.history.push('/app/login?url=/app/user')
        localStorage.removeItem('userInfo')
        store.dispatch(removeUserInfo())
      }
      
    }
    //跳到首页
    toIndex=()=>{
      window.location.href='/'
    }
    //获取用户信息
    getUserInfo=async()=>{
      const result = await getUser()
      if(result.status){
        this.setState({
          userInfo:result.body
        })
        localStorage.setItem('userInfo',JSON.stringify(result.body))
      }else{
        this.setState({
          loginFlag:true
        })
      }
    }
    //编辑预览返回值
    writingPreview=(val,item)=>{
      this.setState({
        isArticleDetail:val,
        asideActive:val,
        newsDetail:item,
        editItem:item
      })
    }
    componentDidMount=()=>{
      let local=this.props.location
      if(local.query){
        this.setState({
          navActiveIndex:local.query[0],
          asideActive:local.query[1]
        })
      }
      this.getUserInfo()
    }
    render(){
        let {nav,navActiveIndex,exitActive,aside,isArticleDetail,userInfo,loginFlag,newsDetail,editItem} = this.state
        let asideActive = navActiveIndex === 2?this.state.asideActive:0
        if(loginFlag){
          return <Redirect to='/app/login?url=/app/user' />;
        }
        return <div id='user' onClick={()=>{this.setState({exitNone:true})}}>
          <div className='flextop'>
            <div className='usertop '>
                <div className='flexb'>
                    <div className='flexl cursor' onClick={this.toIndex}>
                      <div className='homeimg fleximgtop'><img src={homeimg} alt="home" /></div>
                      <span className='colorw'>返回官网首页</span>
                    </div>
                    <div className='flexr cursor position' onClick={this.exitloginpre}>
                      <div className='headerimg fleximgtop'><img src={headerimg} alt="username" /></div>
                      <span className='colorw user-name'>{userInfo.name}</span>
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
                    <div className='fleximg logoimg cursor' onClick={this.toIndex}>
                        <img src={logoimg} alt="logo" />
                    </div>
                    <div className='line'></div>
                    <div className='flexl navitems'>
                        {nav.map((item,index)=>(
                            <div 
                              key={index}
                              className={navActiveIndex === index?'fleximg navactive':'fleximg'}
                              onClick={()=>{this.setState({navActiveIndex:index});window.scrollTo (0,0);}}
                            >{item}</div>                            
                        ))}
                    </div>                    
                </div>
            </div>
          </div>
          <div></div>
          <div className='content'>
            <div className='flexbl width'>
              <div>
                <div className='userinfo'>
                  <div className='headerimg fleximg position'>
                    <img src={headerimg} alt="header" />
                    <div className='userlevel fleximg'><span>LV.{userInfo.level}</span></div>
                  </div>
                  <div className='userphone'>{userInfo.mobile}</div>
                  <div className='fleximg'>
                    <div className='fleximg realnamedimg'><img src={realnamedimg} alt="realnamed" /></div>
                    <div className='fleximg phoneimg'><img src={phoneimg} alt="realnamed" /></div>
                  </div>
                </div>
                <div className='aside'>
                  {aside[navActiveIndex].map((item,index)=>(
                    <div 
                      key={index}
                      className={asideActive === index?'aside-active':'' }
                      onClick={()=>{
                        this.setState({asideActive:index,isArticleDetail:0,editItem:this.state.editItem})
                        console.log(this.state.editItem)
                      }}
                      >{item}</div>
                  ))}
                </div>
              </div>
              
              <div className='usermain'>
                {
                  navActiveIndex === 0 ? <MyTask /> :
                  navActiveIndex === 1 ? <Profit /> :
                  (navActiveIndex === 2 && asideActive === 0)? <Writing preview={(val,item)=>{this.writingPreview(val,item)}} item={editItem} publish={(val)=>{this.setState({editItem:null})}}/>:
                  (navActiveIndex === 2 && asideActive === 2) ? <DataAnalysis />:
                  (navActiveIndex === 2 && asideActive === 1 && isArticleDetail === 0) ? 
                    <ArticleList 
                      edit={(val,item)=>{this.setState({asideActive:val,editItem:item})}}
                      dataAnalysis={(val)=>{this.setState({asideActive:val})}}
                      articleDetail={(val,item)=>{this.setState({isArticleDetail:val,newsDetail:item})}}
                    />:
                  (navActiveIndex === 2 && asideActive === 1 && isArticleDetail === 1) && 
                  <div className='usermain-ArticleDetail'>
                    <ArticleDetail newsDetail={newsDetail}/>
                  </div>
                   
                }
                
              </div>
            </div> 
          </div>
        </div>
    }
    
}
export default withRouter(User);