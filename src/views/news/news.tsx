//@ts-nocheck
import { Component } from 'react'
import './news.scss'
import Header from './component/header/header'
import NewsListItem from './component/newsListItem/newsListItem'
import NewsNav from './component/newsNav/newsNav';
import FollowButton from './component/followButton/followButton';

import writeimg from '../../public/images/user/write.png'
import exchangeimg from '../../public/images/user/exchange.png'

export default class News extends Component{
  state={
    isLogin:true,//是否登录了
    exitNone:true,//退出登录是否显示
    newsTypeActive:0,
    mayInterestList:[],
    newsList:[],
    scrollHeight: 0,
    hasMore: true,// 判断接口是否还有数据，通过接口设置
  }
  loadMoreData=()=>{
    let array=this.state.newsList
    setTimeout(()=>{
      let ary=[]
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
        newsList:array.concat(ary) 
      })
    },500)
  }
  handleScroll=()=>{
    const {hasMore} = this.state;
    if(!hasMore){
        return;
    }
    //下面是判断页面滚动到底部的逻辑
    console.log(this.scrollDom.scrollTop+this.scrollDom.clientHeight,this.scrollDom.scrollHeight)
    if(this.scrollDom.scrollTop + this.scrollDom.clientHeight+1 >= this.scrollDom.scrollHeight){
        this.loadMoreData()
    }
  }
  newsIndexChange=(val)=>{
    this.setState({newsTypeActive:val})
  }
  componentDidMount(){
    this.setState({
      scrollHeight: window.innerHeight 
  })


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

    const el = document.querySelector('.news-list')
    const offsetHeight = el.offsetHeight
    console.log(el)
    el.onscroll = () => {
      console.log(88)
      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight
      if (offsetHeight + scrollTop - scrollHeight >= 500) {
        // 需要执行的代码
        console.log('已滚动到底部')
        // 调用list 原本的数据请求函数
        // this.handleInfiniteOnLoad()
      }
    }
  }
  render(){
    let isLogin=this.state.isLogin,exitNone=this.state.exitNone;
    let newsTypeActive = this.state.newsTypeActive,mayInterestList=this.state.mayInterestList;
    let newsList=this.state.newsList
    let scrollHeight = this.state.scrollHeight;
    return (
      <div id='news' onClick={()=>{this.setState({exitNone:true})}} ref={body=>this.scrollDom = body} style={{height: scrollHeight}}
      onScroll={this.handleScroll.bind(this)}>
        <div className='news-header'>
          <Header 
            isLogin={isLogin} 
            exitNone={exitNone} 
            exitNoneFlag={(val)=>{this.setState({exitNone:val})}}           
          />  
        </div> 
        <div className='news-down'>
          <div className='news-down-top'></div>
          <div className='width flexbl position'>
            <div className='news-main'>
              <NewsNav newsIndexChange={this.newsIndexChange} />
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
        <div className='width flexbl'>
          <div className='news-main'>
            {newsTypeActive === 0 &&
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
                      <div>
                        <FollowButton item={item}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
            
            <div className='news-list'  >
              {newsList.map((item,index)=>(
                <div>
                  <NewsListItem item={item}/>
                </div>
              ))}
            </div>
          </div>
          </div>
      </div>
    )
  }
}