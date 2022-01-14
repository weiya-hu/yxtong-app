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
    interestSize:7,
    newsPage:1,
    newsSize:3,
    userInfo:null,
    newsTypeId:null
  }
  loadMoreData=()=>{
    this.getNewslist(this.state.newsTypeId)
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
  newsIndexChange=(val,item,flag)=>{
    if(flag){
      this.setState({
        newsTypeActive:val,
        newsPage:1,
        newsTypeId:item.id,
        newsList:[]
      },()=>{this.getNewslist(item.id)})
      
    }else{
      let param = this.props.location.query
      if(param){
        this.getNewslist(param.item.id)
        this.setState({newsTypeActive:param.index})
        console.log(this.state.newsTypeActive)
      }else{
        this.getNewslist(item.id)
      }
    }
    if(val === 0){
      this.getFavorlist()
    }
  }
  getInfo=()=>{
    let param = this.props.location.query
    if(param){
      this.newsIndexChange(param.index,param.item)
    }else{

    }
  }
  //获取新闻列表
  getNewslist=async(id)=>{
    let {newsPage,newsSize,newsList} =this.state
    let data={
      current:newsPage,
      size:newsSize,
      typeId:id
    }
      const rest = await newsNewsList(data)
      if(rest.status){
        this.setState({
          newsList:newsList.concat(rest.body.newsList),
          hasMore:rest.body.total>newsPage*newsSize,
          newsPage:newsPage+1
        })
      }
      
  }
  //跳转新闻详情页
  toNewsDetail=(item)=>{
    console.log(item)
    this.props.history.push( { pathname : '/app/newsdetail/?id='+item.id})
   
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
        mayInterestList:res.body.attList
      })
    }
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll, false)
    console.log(this.props.location.query)

  }
  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll)
    this.setState = (state,callback)=>{
      return;
    }
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
              <div className='bold'>创作中心</div>
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
                      <div className='fleximg writeimg'><img src={item.head_url} alt="header" /></div>
                      <div >{item.name}</div>
                      <div>
                        <FollowButton item={item} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
            
            <div className='news-list'  >
              {newsList.map((item,index)=>(
                <div key={index} onClick={()=>this.toNewsDetail(item)}>
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