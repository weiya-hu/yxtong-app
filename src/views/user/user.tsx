//@ts-nocheck
import { Component } from 'react'
import './user.scss'
import {loginOut,getUser } from 'service/login'
import {newsCreationAuthor } from 'service/news'
import { Redirect ,withRouter} from 'react-router-dom';
import { util } from 'utils/news'
import { userComponent } from 'utils/userComponent'
import store from "store/index";
import { removeUserInfo} from "store/actionCreators.js";
import { Base64 } from 'js-base64';


import logoimg from 'public/images/logo.png'
import homeimg from 'public/images/user/home.png'
import exitimg from 'public/images/user/exit.png'
import exitactiveimg from 'public/images/user/exitactive.png'
import headerimg from 'public/images/user/header.png'
import downMoreimg from 'public/images/user/downMore.png'
import { Divider } from 'antd';

let UNLISTEN;

class User extends Component {
    state={
        nav:['我的任务','我的收益','创作中心','设置','企业管理'],  
        aside:[['我的任务'],['积分明细'],['发布文章','内容管理'],['基本信息','账户安全','实名认证'],['企业认证'],['我的消息']],//侧边栏的导航文字
        // nav:['个人中心','我的任务','我的团队','我的推广'],
        // aside:[['我的任务'],['积分明细'],['发布文章','内容管理','数据分析'],['我的消息'],['设置']],
        navActiveIndex:1,//导航active的id
        asideActive:1,//侧边栏active的id
        asideSonActive:1,//侧边栏二级菜单active的id
        isArticleDetail:0,//是否是详情页
        exitActive:false,//退出按钮是否hover
        exitNone:true,//退出登录是否显示
        userInfo:{},
        loginFlag:false,
        authorNewsInfo:{},//用户新闻信息
        opens:[],//当前左导航是否打开的数组
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
      })
    }
    navChange=(id)=>{
      this.props.history.push('/app/user?componentId='+id+'11')
      window.scrollTo (0,0);
    }
    asideNavChange=(item,index)=>{
      if(item.children){
        let {opens}=this.state
        opens[index]=!opens[index]
        this.setState({opens:opens})
      }else{
        this.props.history.push('/app/user?componentId='+this.state.navActiveIndex+item.id)
        window.scrollTo (0,0);
      }
      
    }
    asideSonChange=(navActiveIndex,asideActive,id)=>{
      this.props.history.push('/app/user?componentId='+navActiveIndex+asideActive+id)
      window.scrollTo (0,0);
    }
    //获取渲染的组件
    findComponent=(arr,id,componentId)=>{
      let component = arr.find(m=>m.id == id)
      return component.children ? this.findComponent(component.children,componentId[component.lv],componentId) : component.component
    }
    //根据URL传的值切换组件
    getComponent=(navActiveIndex,asideActive,asideSonActive,isArticleDetail)=>{
      let Component = this.findComponent(userComponent,navActiveIndex,[navActiveIndex,asideActive,asideSonActive])
      return <Component />
    }
    //检查路径中的componentId是否合法
    checkComponentId=(arr,id,componentId)=>{
      let component=arr.find(m=>m.id == id)
      (!component) && this.props.history.push('/app/user?componentId=111')
      component.children && this.checkComponentId(component.children,componentId[component.lv],componentId)
    }
    //获取用户关注粉丝信息
    getNewsCreationAuthor=async()=>{
      const {status,body}= await newsCreationAuthor()

      status && this.setState({authorNewsInfo:body})
    }
    //获取当前id所在item
    getItem=(arr,id)=>{
      return arr.find(m=>m.id == id)
    }
    componentDidMount=()=>{
      document.title = '康州数智-个人中心'
      this.getNewsCreationAuthor()
      let components=util.getUrlParam('componentId'),componentId=[]
      components && (componentId=components.split(''))
      // componentId[0] && this.checkComponentId(userComponent,componentId[0],componentId)
      //根据页面路径显示相应的组件
      let item=this.getItem(userComponent,componentId[0] || 1),opens=[]
      item.children.map((item)=>{opens.push(true)})
      this.setState({
        navActiveIndex:componentId[0] || 2,//路径里面没有值就默认1
        asideActive:componentId[1] || 1,//路径里面没有值就默认1
        asideSonActive:componentId[2] || 1,
        isArticleDetail:util.getUrlParam('readNewsId'),
        opens:opens
      })
      this.getUserInfo()
      //监听路由变化切换组件显示
      UNLISTEN = this.props.history.listen(route => { 
        let components=util.getUrlParam('componentId'),componentId=[]
        components && (componentId=components.split(''))
        // componentId[0] && this.checkComponentId(userComponent,componentId[0],componentId)
        let item=this.getItem(userComponent,componentId[0] || 1),opens=[]
        item.children.map((item)=>{opens.push(true)})
        this.setState({
          navActiveIndex:componentId[0] || 2,//路径里面没有值就默认1
          asideActive:componentId[1] || 1,//路径里面没有值就默认1
          asideSonActive:componentId[2] || 1,
          isArticleDetail:util.getUrlParam('readNewsId'),
          opens:opens
        })
      });
    }

    componentWillUnmount(){
      UNLISTEN && UNLISTEN(); // 监听路由变化执行解绑
    }
    render(){
        let {navActiveIndex,exitActive,isArticleDetail,userInfo,loginFlag,asideActive,asideSonActive,authorNewsInfo,opens} = this.state
        if(loginFlag){
          return <Redirect to={'/app/login?url='+Base64.encode('/app/user')}/>;
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
                      <div className='headerimg fleximgtop'><img src={userInfo.head || headerimg } alt="username" /></div>
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
                        {userComponent.map((item)=>(
                            item.show && <div 
                              key={item.id}
                              className={navActiveIndex == item.id?'fleximg navactive pointer':'fleximg pointer'}
                              onClick={()=>this.navChange(item.id)}
                            >{item.name}</div>                            
                        ))}
                    </div>                    
                </div>
            </div>
          </div>
          <div className='left-nav-pre'>
            <div className='left-nav flexbl width'>
              <div className='left-nav-son'>
                <div className='userinfo'>
                  <div className='headerimgpre fleximg position'>
                    <div className='headerimg  fleximg'><img src={userInfo.head || headerimg} alt="header" /></div>
                    <div className='userlevel fleximg'><span>LV.{userInfo.level}</span></div>
                  </div>
                  <div className='userphone'>{userInfo.mobile}</div>
                  <div className='fleximg'>
                    <div className='user-news-info-item fleximgc'>
                      <div>{authorNewsInfo.news_count}</div>
                      <div>文章</div>
                    </div>
                    <div className='user-news-info-item fleximgc user-news-info-item-border'>
                      <div>{authorNewsInfo.attention_count}</div>
                      <div>关注</div>
                    </div>
                    <div className='user-news-info-item fleximgc'>
                      <div>{authorNewsInfo.fans_count}</div>
                      <div>粉丝</div>
                    </div>
                  </div>
                </div>
                <div className='aside'>
                  {this.getItem(userComponent,navActiveIndex).children.map((item,index)=>(
                    item.show && <div 
                      key={item.id}
                      className={opens[index]?'':'left-nav-height-no'}
                    >
                      <div 
                        className='flexl left-nav-item'
                        onClick={()=>this.asideNavChange(item,index)}
                      >
                        <div className='iconimg'> <img src={asideActive == item.id?item.icon_a:item.icon} alt="icon" /> </div>
                        <div className={asideActive == item.id?'aside-active':'bold' }>{item.name}</div>
                        {item.children && <div className={opens[index]?'fleximg downMoreimg':'fleximg downMoreimg downMoreimg-close'}><img src={downMoreimg} alt="downMore" /></div>}
                      </div>
                      {item.children && item.children.map((itm)=>(
                        item.show &&<div 
                          key={itm.id}
                          onClick={()=>this.asideSonChange(navActiveIndex,asideActive,itm.id)}
                          className={(asideActive == item.id && asideSonActive == itm.id)?'left-nav-item-son-a left-nav-item-son':'left-nav-item-son'}
                        >{itm.name}</div> 
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='flexr width'>
              <div className='usermain'>
                {this.getComponent(navActiveIndex,asideActive,asideSonActive,isArticleDetail)}
              </div>
            </div> 
          </div>
        </div>
    }
}
export default withRouter(User);