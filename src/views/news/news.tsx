//@ts-nocheck
import { Component } from 'react'
import './news.scss'
import Header from './component/header/header'
import NewsListItem from './component/newsListItem/newsListItem'
import NewsNav from './component/newsNav/newsNav';
import FollowButton from './component/followButton/followButton';
import MoreTxt from './component/moreTxt/moreTxt';
import {util} from '../../utils/news'
import {newsNewsList,newsAList} from '../../service/news'

import writeimg from '../../public/images/user/write.png'
import exchangeimg from '../../public/images/user/exchange.png'


export default class News extends Component{
  state={
    isLogin:true,//是否登录了
    newsTypeActive:0,//新闻类型的默认值
    mayInterestList:[],
    newsList:[],
    hasMore: true,// 判断接口是否还有数据，通过接口设置
    interestPage:1,
    interestSize:7
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
  // 页面滚动
  handleScroll = () => {
    const {hasMore} = this.state;
    if(!hasMore){
        return;
    }
    if(util.getIsTOBottom() < 10){
      // 解除绑定
      window.removeEventListener('scroll', this.handleScroll ,false);
      // 在这里发送请求
      this.loadMoreData()
      // 并在请求到数据后重新开启监听
      setTimeout(()=>window.addEventListener('scroll', this.handleScroll, false), 300)
    }
  }
  //根据新闻类型获取新闻列表
  newsIndexChange=(val,item)=>{
    if(val === 0){
      this.getFavorlist()
    }
    this.setState({newsTypeActive:val})
    this.getNewslist(item.id)
  }
  //获取新闻列表
  getNewslist=async(id)=>{
      const rest = await newsNewsList({type_id:id})
      if(rest.status){
        this.setState({
          newsList:res.body
        })
      }
      
  }
  getFavorlist=async()=>{
    const {interestPage,interestSize}=this.state
    let data={
      current:interestPage,
      size:interestSize
    }
    const res = await newsAList(data)
    if(res.status){
      this.setState({
        mayInterestList:res.body.body,
        interestPage:interestPage +1
      })
    }
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll, false)
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


  }
  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll)
  }
  render(){
    const {isLogin,exitNone,newsTypeActive,mayInterestList,newsList,hasMore}=this.state
    return (
      <div id='news'>
        <div className='news-header'>
          <Header />  
        </div> 
        <div className='news-down'>
          <div className='news-down-top'></div>
          <div className='width flexbl position'>
            <div className='news-main'>
              <NewsNav newsTypeActive={newsTypeActive} newsIndexChange={this.newsIndexChange} />
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
          <div className='news-main news-position-left'>
            {newsTypeActive === 0 &&
              <div className='may-interest'>
                <div className='may-interest-title flexb'>
                  <div className='may-interest-title-txt'>您可能感兴趣</div>
                  <div className='flexr' onClick={this.getFavorlist}>
                    <div className='exchangeimg fleximg'><img src={exchangeimg} alt="exchangeimg" /></div>
                    <div className='color3'>换一换</div>
                  </div>
                </div>
                <div className='may-interest-list flexl'>
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
                <div key={index}>
                  <NewsListItem item={item}/>
                </div>
              ))}
            </div>
              <MoreTxt hasMore={hasMore}/>
          </div>
        </div>
      </div>
    )
  }
}