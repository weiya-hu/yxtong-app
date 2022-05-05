//@ts-nocheck
import { Component } from 'react'
import './news.scss'
import Header from './component/header/header'
import NewsListItem from './component/newsListItem/newsListItem'
import NewsNav from './component/newsNav/newsNav';
import FollowButton from './component/followButton/followButton';
import MoreTxt from './component/moreTxt/moreTxt';
import {util} from 'utils/news'
import {newsNewsList,newsAList,newsCreatorDate,newsFavorList} from 'service/news'
import PopupLogin from 'views/login/popupLogin';


import store from 'store';
import { loginShow } from 'store/actionCreators';

import writeimg from 'public/images/user/write.png'
import exchangeimg from 'public/images/user/exchange.png'
import headerimg from 'public/images/user/header2.png'
import arrowimg from 'public/images/arrow.png'
import arrowaimg from 'public/images/arrow_a.png'
import loadingimg from 'public/images/user/loading.png'



export default class News extends Component{
  constructor(props) {
    super(props)
    // 监听state状态改变
    store.subscribe(() => {
      const state = store.getState()
      this.setState({loginShow:state.loginShow})
    })
  }
  state={
    isLogin:true,//是否登录了
    newsTypeActive:1,//新闻类型的默认值
    mayInterestList:[],
    newsList:[],
    favorList:[],
    hasMore: true,// 判断接口是否还有数据，通过接口设置
    interestPage:1,
    interestSize:7,
    interestLoading:false,
    favorPage:1,
    favorSize:7,
    newsPage:1,
    newsSize:5,
    userInfo:null,
    newsTypeId:null,
    exchangeRotate:false,//换一换旋转的图标是否转动
    UserAnalysis:{},
    left:false,//关注中左箭头active状态
    right:false,//关注中右箭头active状态
    newsMayLikeId: store.getState().newsMayLikeId,//推荐栏目id
    newsFollowId: store.getState().newsFollowId,//关注栏目id
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
  newsIndexChange=()=>{
    let id = util.getUrlParam('newsTypeId')
    const { newsMayLikeId, newsFollowId }=this.state
    this.setState({
      newsTypeId: id,
      newsPage: 1,
      newsList: [],
    },()=>{this.getNewslist(id)})
    
    if(id == newsMayLikeId){
      this.getFavorlist()
      return
    }
    if(id == newsFollowId){
      this.getInterestList(1)
      return
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
          newsList:newsList.concat(rest.body.records),
          hasMore:rest.body.total>newsPage*newsSize,
          newsPage:newsPage+1
        })
      }
      
  }
  //跳转新闻详情页
  toNewsDetail=(item)=>{
    window.open(window.location.protocol+'//'+window.location.host+'/app/newsdetail?newsId='+item.id, "_blank"); 
  }
  //获取可能感兴趣列表
  getFavorlist=async()=>{
    const {interestPage,interestSize}=this.state
    this.setState({exchangeRotate:true})
    let data={
      current:interestPage,
      size:interestSize
    }
    const res = await newsAList(data)
    if(res.status){
      this.setState({
        mayInterestList:res.body.records,
        exchangeRotate:false,
        interestPage:res.body.pages>interestPage?interestPage+1:1
      })
    }
  }
  //获取关注列表,num（0,1）是是否是第一次加载，isright（0,1）是否是右箭头1，左箭头0被按了
  getInterestList=async(num,isright)=>{
    const {favorPage,favorSize,interestLoading} = this.state
    if(num){
      let data={
        current:1,
        size:favorSize
      }
      const res = await newsFavorList(data)
      res.status && this.setState({
        favorList:res.body.records,
        favorPage:1,
        right:res.body.pages>favorPage?true:false,
      })
    }else{
      console.log(favorPage)
      let data={
        current:isright?favorPage+1:favorPage-1,
        size:favorSize
      }
      const res = await newsFavorList(data)
      res.status && this.setState({
        favorList:res.body.records,
        favorPage:data.current,
        right:res.body.pages>data.current?true:false,
        left:data.current>1?true:false
      })
    }
  }
  //用户数据统计
  getUserAnalysis=async()=>{
    const res = await newsCreatorDate()
    if(res.status){
      this.setState({
        UserAnalysis:res.body
      })
    }
    
  }
  toUser=()=>{
    let userInfo = store.getState().userInfo
    if(userInfo){
      this.props.history.push({pathname:'/app/user?componentId=72'})
    }else{
      store.dispatch(loginShow())
    }
    
  }
  toUserWrite=()=>{
    let userInfo = store.getState().userInfo
    if(userInfo){
      this.props.history.push({pathname:'/app/user?componentId=71'})
    }else{
      store.dispatch(loginShow())
    }
    
  }
  followChange=(val)=>{
    let list =JSON.parse(JSON.stringify(this.state.newsList))
    let alist = JSON.parse(JSON.stringify(this.state.mayInterestList))
    list.forEach((item) => {
      (val.creator_id === item.creator_id) && (item.is_attention = val.types?'1':null)
    });
    alist.forEach((item) => {
      (val.creator_id === item.creator_id) && (item.is_attention = val.types?'1':null)
    });
    this.setState({newsList:list,mayInterestList:alist})
  }
  componentDidMount(){
    this.getUserAnalysis()
    window.addEventListener('scroll', this.handleScroll, false)
    document.title = '康州数智科技-资讯中心'
    window.scrollTo (0,0);
    this.newsIndexChange()
  }
  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll)
    this.setState = (state,callback)=>{
      return;
    }
  }
  render(){
    const {UserAnalysis,newsTypeActive,mayInterestList,newsList,hasMore,exchangeRotate,loginShow,left,right,favorList,newsTypeId,newsMayLikeId, newsFollowId}=this.state
    return (
      <div id='news' className='back-color'>
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
              <div className='writeimg fleximg cursor' onClick={this.toUserWrite}><img src={writeimg} alt="write" /></div>
              <div className='font12 cursor' onClick={this.toUserWrite}>写文章</div>

              <div className='hr'></div>
              <div className='flexa'>
                <div className='fleximgc'>
                  <div className='font12'>今日阅读</div>
                  <div className='today-read'>{UserAnalysis.readt}</div>
                  <div className='yeterday-profit'>昨日阅读 <span>{UserAnalysis.ready}</span></div>
                </div>
                <div className='fleximgc'>
                  <div className='font12'>今日分享</div>
                  <div className='today-read'>{UserAnalysis.sharet}</div>
                  <div className='yeterday-profit'>昨日分享 <span>{UserAnalysis.sharey}</span></div>
                </div>
                <div className='fleximgc'>
                  <div className='font12'>今日收益</div>
                  <div className='today-read'>{UserAnalysis.integralt}</div>
                  <div className='yeterday-profit'>昨日收益 <span >{UserAnalysis.integraly}</span></div>
                </div>
              </div>
              <div className='button fleximg pointer' onClick={this.toUser}>进入内容中心</div>
            </div>
          </div>
        </div>
        <div className='width flexbl ' >
          <div className='news-main news-position-left'>
            {newsTypeId == newsMayLikeId &&
              <div className='may-interest'>
                <div className='may-interest-title flexb'>
                  <div className='may-interest-title-txt'>您可能感兴趣</div>
                  <div className='flexr cursor' onClick={this.getFavorlist}>
                    <div className={exchangeRotate?'exchangeimg fleximg exchange-rotate':'exchangeimg fleximg'}>
                      <img src={exchangeimg} alt="exchangeimg" />
                    </div>
                    <div className='color3 '>换一换</div>
                  </div>
                </div>
                <div className='may-interest-list flexl'>
                  {mayInterestList.map((item,index)=>(
                    <div className='may-interest-item fleximgc' key={index} onClick={()=>this.props.history.push('/app/newsauthormore?creatorId='+item.creator_id)}>
                      <div className='fleximg writeimg head'><img src={item.head_url?item.head_url:headerimg} alt="header" onError={(e) => { e.target.src = headerimg }}/></div>
                      <div className='onemore article-name'>{item.name || '用户'}</div>
                      <div>
                        <FollowButton item={item} key={item.is_attention} change={this.followChange}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
            {(newsTypeId == newsFollowId && favorList.length >0) &&
              <div className='may-interest flexb'>
                <div className='interest-arrow fleximg'  onClick={()=>{left && this.getInterestList(0,0)}}>
                  <div className='fleximg arrowimg-left'>
                    <img src={left?arrowaimg:arrowimg} alt="arrow" />
                  </div>
                </div>
                
                <div className='may-interest-list-ed flexl'>
                  {favorList.map((item,index)=>(
                    item && <div className='may-interest-item fleximgc' key={index} onClick={()=>this.props.history.push('/app/newsauthormore?creatorId='+item.creator_id)}>
                      <div className='fleximg writeimg head'><img src={item.head_url || headerimg} alt="header" onError={(e) => { e.target.src = headerimg }}/></div>
                      <div className='onemore name'>{item.name || '用户'}</div>
                    </div>
                  ))}
                </div>
                <div className='interest-arrow fleximg' onClick={()=>{right && this.getInterestList(0,1)}}>
                  <div className='fleximg arrowimg-right'>
                    <img src={right?arrowaimg:arrowimg} alt="arrow" />
                  </div>
                </div>
                
              </div>
            }
            
            <div className='news-list'  >
              {newsList.map((item,index)=>(
                <div key={index} onClick={()=>this.toNewsDetail(item)}>
                  <NewsListItem key={item.id}  item={item} followChange={this.followChange}/>
                </div>
              ))}
            </div>
              <MoreTxt hasMore={hasMore}/>
          </div>
        </div>
        {loginShow &&  <PopupLogin />}
      </div>
    )
  }
}