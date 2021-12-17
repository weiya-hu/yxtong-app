//@ts-nocheck
import { Component } from 'react'
import './news.scss'
import Header from './component/header/header'

export default class News extends Component{
  state={
    isLogin:true,//是否登录了
    exitNone:true,//退出登录是否显示
    newsType:['关注','推荐','热榜','抗疫','健康','小说','娱乐','美食','财经','更多']
  }
  render(){
    let isLogin=this.state.isLogin,exitNone=this.state.exitNone,newsType=this.state.newsType
    return (
      <div id='news' onClick={()=>{this.setState({exitNone:true})}}>
        <div>
          <Header isLogin={isLogin} exitNone={exitNone} exitNoneFlag={(val)=>{this.setState({exitNone:val})}}/>  
        </div> 
        <div className='width top10 flexb'>
          <div className='news-main'>
            <div className='news-type flexl'>
              {newsType.map((item,index)=>(
              <div className='news-type-item'>{item}</div>))}
            </div>

          </div>
          <div className='userinfo'>  

          </div>
        </div>
      </div>
    )
  }
}