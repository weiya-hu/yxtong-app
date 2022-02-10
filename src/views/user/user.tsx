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
import { util } from 'utils/news'

import store from "store/index";
import { removeUserInfo} from "store/actionCreators.js";

import logoimg from 'public/images/logo.png'
import homeimg from 'public/images/user/home.png'
import exitimg from 'public/images/user/exit.png'
import exitactiveimg from 'public/images/user/exitactive.png'
import headerimg from 'public/images/user/header.png'
import realnamedimg from 'public/images/user/realnamed.png'
import phoneimg from 'public/images/user/phone.png'

let UNLISTEN;
class User extends Component {
    state={
        nav:['我的任务','我的收益','创作中心','设置'],
        // aside:[['我的任务'],['积分明细'],['发布文章','内容管理','数据分析'],['我的消息'],['设置']],
        aside:[['我的任务'],['积分明细'],['发布文章','内容管理'],['设置'],['我的消息']],//侧边栏的导航文字
        navActiveIndex:0,//导航active的下标
        asideActive:0,//侧边栏active的下标
        isArticleDetail:0,//是否是详情页
        exitActive:false,//退出按钮是否hover
        exitNone:true,//退出登录是否显示
        userInfo:{},
        loginFlag:false,
        newsDetail:{},//文章详情
        editItem:null,
        isPreview:false,//文章详情页是否为预览
    }
    exitloginpre=(e)=>{
      e.stopPropagation()
      this.setState({exitNone:!this.state.exitNone})
    }
    //退出登录,跳到首页
    exitlogin=async(e)=>{
      e.stopPropagation()
      let res = await loginOut()
      if(res.status){
        window.location.href='/'
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
        editItem:item,
        isPreview:true
      })
    }
    navChange=(index)=>{
      this.props.history.push('/app/user?navActiveIndex='+index+'&asideActive=0')
      window.scrollTo (0,0);
    }
    asideNavChange=(index)=>{
      this.props.history.push('/app/user?navActiveIndex='+util.getUrlParam('navActiveIndex')+'&asideActive='+index)
      window.scrollTo (0,0);
      // this.setState({asideActive:index,isArticleDetail:0,editItem:this.state.editItem})
    }
    componentDidMount=()=>{
      document.title = '康州数智-个人中心'
      this.setState({
        navActiveIndex:util.getUrlParam('navActiveIndex') || 0,//路径里面没有值就默认0
        asideActive:util.getUrlParam('asideActive') || 0,//路径里面没有值就默认0
        isArticleDetail:util.getUrlParam('readNewsId')
      })
      console.log(util.getUrlParam('navActiveIndex'),util.getUrlParam('asideActive'),util.getUrlParam('readNewsId'))
      this.getUserInfo()
      //监听路由变化切换组件显示
      UNLISTEN = this.props.history.listen(route => { 
        let navIndex = util.getUrlParam('navActiveIndex')
      let asideIndex = util.getUrlParam('asideActive')
      let isArticleDetail=util.getUrlParam('readNewsId')
        console.log(navIndex,asideIndex,isArticleDetail)
        this.setState({
          navActiveIndex:navIndex,
          asideActive:asideIndex,
          isArticleDetail:isArticleDetail
        })
      });
    }

    componentWillUnmount(){
      UNLISTEN && UNLISTEN(); // 监听路由变化执行解绑
    }
    render(){
        let {nav,navActiveIndex,exitActive,aside,isArticleDetail,userInfo,loginFlag,newsDetail,editItem,isPreview,asideActive} = this.state
        // let asideActive = navActiveIndex === 2?this.state.asideActive:0
        console.log(navActiveIndex)
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
                              className={navActiveIndex == index?'fleximg navactive pointer':'fleximg pointer'}
                              onClick={()=>this.navChange(index)}
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
                      className={asideActive == index?'aside-active pointer':'pointer' }
                      onClick={()=>this.asideNavChange(index)}
                      >{item}</div>
                  ))}
                </div>
              </div>
              
              <div className='usermain'>
                {
                  navActiveIndex == 0 ? <MyTask /> :
                  navActiveIndex ==1 ? <Profit /> :
                  (navActiveIndex == 2 && asideActive == 0)? <Writing 
                        preview={(val,item)=>{this.writingPreview(val,item)}} 
                        item={editItem} 
                        publish={(val)=>{this.setState({editItem:null})}}
                        save={(val)=>{this.setState({editItem:val})}}
                  />:
                  (navActiveIndex == 2 && asideActive == 2) ? <DataAnalysis />:
                  (navActiveIndex == 2 && asideActive == 1 && !isArticleDetail) ? 
                    <ArticleList 
                      dataAnalysis={(val)=>{this.setState({asideActive:val})}}
                      articleDetail={(val,item)=>{this.setState({isArticleDetail:val,newsDetail:item,isPreview:false})}}
                      
                    />:
                  (navActiveIndex == 2 && asideActive == 1 && isArticleDetail) && 
                  <div className='usermain-ArticleDetail'>
                    <ArticleDetail isPreview={isPreview} backReview={(val)=>{this.setState({asideActive:0})}}/>
                  </div>
                   
                }
                
              </div>
            </div> 
          </div>
        </div>
    }
    
}
export default withRouter(User);