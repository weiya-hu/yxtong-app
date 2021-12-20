//@ts-nocheck
import { Component } from 'react'
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import './news.scss'
import Header from './component/header/header'
import NewsListItem from './component/newsListItem/newsListItem'

import writeimg from '../../public/images/user/write.png'
import exchangeimg from '../../public/images/user/exchange.png'
import addSmallimg from '../../public/images/user/addSmall.png'
import gouimg from '../../public/images/user/gou.png'
export default class News extends Component{
  state={
    isLogin:true,//是否登录了
    exitNone:true,//退出登录是否显示
    newsType:['关注','推荐','热榜','抗疫','健康','小说','娱乐','美食','财经','更多'],
    newsTypeActive:0,
    mayInterestList:[],
    newsList:[]
  }
  loadMoreData=()=>{
    setTimeout(()=>{
      for(let i=0;i<7;i++){
        let itm={
          title:'国民党终于拿出一铁证，“台湾属于中国”响彻岛内！',
          content:'今年9月份，前台湾地区领导人马英九在参加一场新书发布会接受媒体采访时，拿出了台湾属于中国的铁证，当时，马英九表示，《开罗宣言》中明确指出，“日本盗窃中国的领土，例如东北三省，台湾等等',
          time:'2021年9月23日',
          read:3029,
          from:'小米网',
          star:i%3 === 0,
          share :i%2 ===0,
          follow:i%3 === 0,
        }
        ary.push(itm)
      }
      this.setState({
        newsList:ary
      })
    },500)
  }
  componentDidMount(){
    let arr =[],ary=[]
    for(let i=0;i<7;i++){
      let item={
        name:'封面新闻',
        follow:i%3 === 0,
      }
      let itm={
        title:'马英九发声后，国民党终于拿出一铁证，“台湾属于中国”响彻岛内！',
        content:'今年9月份，前台湾地区领导人马英九在参加一场新书发布会接受媒体采访时，拿出了台湾属于中国的铁证，当时，马英九表示，《开罗宣言》中明确指出，“日本盗窃中国的领土，例如东北三省，台湾等等',
        time:'2021年9月23日',
        read:3029,
        from:'小米网',
        star:i%3 === 0,
        share :i%2 ===0,
        follow:i%3 === 0,
      }
      arr.push(item)
      ary.push(itm)
    }
    this.setState({
      mayInterestList:arr,
      newsList:ary
    })
    console.log(this.state.mayInterestList,arr)
  }
  render(){
    let isLogin=this.state.isLogin,exitNone=this.state.exitNone,newsType=this.state.newsType;
    let newsTypeActive = this.state.newsTypeActive,mayInterestList=this.state.mayInterestList;
    let newsList=this.state.newsList
    console.log(mayInterestList)
    return (
      <div id='news' onClick={()=>{this.setState({exitNone:true})}}>
        <div>
          <Header isLogin={isLogin} exitNone={exitNone} exitNoneFlag={(val)=>{this.setState({exitNone:val})}}/>  
        </div> 
        <div className='width top10 flexbl'>
          <div className='news-main'>
            <div className='news-type flexl'>
              {newsType.map((item,index)=>(
              <div 
                key = {index}
                className={newsTypeActive === index ?'news-type-item news-type-item-active':'news-type-item'}
                onClick={()=>{this.setState({newsTypeActive:index})}}
              >{item}</div>))}
            </div>
            <div className='may-interest'>
              <div className='may-interest-title flexb'>
                <div className='may-interest-title-txt'>您可能感兴趣</div>
                <div className='flexr'>
                  <div className='exchangeimg fleximg'><img src={exchangeimg} alt="exchangeimg" /></div>
                  <div className='color3'>换一换</div>
                </div>
              </div>
              <div className='may-interest-list flexb'>
                {mayInterestList.map((item,index)=>(
                  <div className='may-interest-item fleximgc' key={index}>
                    <div className='fleximg writeimg'><img src={writeimg} alt="cover" /></div>
                    <div >{item.name}</div>
                    <div className={item.follow?' interest-button-gray fleximg':'fleximg interest-button'}>
                      <div className='followimg fleximg'><img src={item.follow?gouimg:addSmallimg} alt="follow" /></div>
                      <span>{item.follow?'已关注':'关注'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='news-list'>
              {newsList.map((item,index)=>(
                <div>
                  <NewsListItem item={item}/>
                </div>
              ))}
            </div>
          </div>
          <div className='userinfo'>  
            <div className='bold'>作者名</div>
            <div className='writeimg fleximg'><img src={writeimg} alt="write" /></div>
            <div className='font12'>写文章</div>
            <div className='hr'></div>
            <div className='flexa'>
              <div className='fleximgc'>
                <div className='font12'>今日阅读</div>
                <div className='today-read'>200</div>
                <div className='yeterday-profit'>昨日阅读 <span>8</span></div>
              </div>
              <div className='fleximgc'>
                <div className='font12'>今日分享</div>
                <div className='today-read'>200</div>
                <div className='yeterday-profit'>昨日分享 <span>8</span></div>
              </div>
              <div className='fleximgc'>
                <div className='font12'>今日收益</div>
                <div className='today-read'>200</div>
                <div className='yeterday-profit'>昨日收益 <span >8</span></div>
              </div>
            </div>
            <div className='button fleximg'>进入内容中心</div>
          </div>
        </div>
      </div>
    )
  }
}