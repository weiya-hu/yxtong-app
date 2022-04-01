//@ts-nocheck
import { Component } from 'react'
import './newsDetail.scss'
import Header from './component/header/header'
import NewsNav from './component/newsNav/newsNav';
import ArticleDetail from 'views/user/articleDetail';
import FollowButton from './component/followButton/followButton';
import AuthorHotArticleItem from './component/authorHotArticleItem/authorHotArticleItem';
import Collect from './component/collect/collect';
import Share from './component/share/share';
import Report from './component/report/report';
import Comment from './component/comment/comment';
import {newsDetail,newsReadList,newsWorksList,addReadLog} from 'service/news'
import PopupLogin from 'views/login/popupLogin';
import {util} from 'utils/news'

import store from 'store';

import toimg from'public/images/user/to.png'
import commentBlackimg from 'public/images/user/commentBlack.png'
import headerimg from 'public/images/user/header.png'
import message  from 'views/component/message/index';

export default class NewsDetail extends Component {
    constructor(props) {
        super(props)
        // 监听state状态改变
        store.subscribe(() => {
            const state = store.getState()
             this.setState({loginShow:state.loginShow})
        })
    }

    state={
        newsTypeActive:-1,
        isLogin:true,//是否登录了
        author:{
            name:'央视新闻',
            follow:false
        },//作者信息
        authorHotList:[],//作者热门作品
        readRank:[],//每日阅读榜
        articleINfo:{
            comment:0,
            collect:false,
            share:false
        },
        newsDetail:{},
        newsProps:this.props.location.query,
        hotArticleList:{},
        total:null,
        loginShow:false,//浮框登录是否显示
    }
    collectChange=(val)=>{
        let articleINfo=JSON.parse(JSON.stringify(this.state.articleINfo)) 
        articleINfo.collect = val
        this.setState({
            articleINfo:articleINfo
        })
    }
    //跳到锚点
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) { anchorElement.scrollIntoView({ behavior: 'smooth'}); }
        }
      }
      //获取新闻详情
    getNewsDetail=async(id)=>{
        // if(!id){
        //     id = util.getUrlParam('newsId')
        // }
        let data={
            newsId:util.getUrlParam('newsId')
        }
        let res =await newsDetail(data)
        if(res.status){
            this.setState({
                newsDetail:res.body
            })
            this.getHotArticleList(res.body.creator_id)
        }else{
            message.info(res.message)
        }
    }
    //每日阅读榜
    newsReadLists=async () => {
        let res = await newsReadList({current:1,size:5})
        res.status && this.setState({
            readRank:res.body.records
        })
    }
    //作者信息和作品列表
    getHotArticleList=async (id) => {
        //to do list,creatorId
        let res = await newsWorksList({creatorId:id,current:1,size:5})
        res.status && this.setState({
            hotArticleList:res.body
        })
    }
    //跳转作者作品页
    toNewsAuthor=()=>{
        let {newsDetail} =this.state
        this.props.history.push('/app/newsauthormore?creatorId='+newsDetail.creator_id)
    }
    //点击nav跳转新闻列表
    navChange=(val,item,flag)=>{
        flag && this.props.history.push({ pathname : '/app/news' , query : {index : val,item:item}})
    }
    //详情页文章切换
    articleChange=(id)=>{
        window.open(window.location.protocol+'//'+window.location.host+'/app/newsdetail?newsId='+id, "_blank"); 
    }
    componentDidMount(){
        this.getNewsDetail()
        this.newsReadLists()
        document.title = '康州数智-新闻资讯详情'
        //检查页面地址中是否有邀请码，有的话之后如果有点到注册页，注册页的邀请码默认值
        let inviteCode = util.getUrlParam('invite_code')
        inviteCode && sessionStorage.setItem('inviteCode',inviteCode)
    }
    render(){
        let {newsTypeActive,total,readRank,newsDetail,hotArticleList,loginShow}=this.state

        return <div className='newsDetail'>
            <div className='header-pre'>
                <Header />
            </div>
            <div className='newsDetail-cont-fixed'>
                <div className='newsDetail-cont-fixed-line'></div>
                <div  className='flexll width'>
                    <div className='newsDetail-share newsDetail-share-mright'>
                        <a onClick={() => this.scrollToAnchor('comment')}>
                            <div className='comment fleximgc'>
                                <div className='fleximg commentBlackimg'><img src={commentBlackimg} alt="comment" /></div>
                                <div className='font12'>{total}</div>
                            </div>
                            </a> 
                        <div className='newsDetail-share-hr'></div>
                        <div className='collect'>
                            <Collect item={newsDetail} css='align'  key={newsDetail.creator_id}/>
                        </div>
                        <div className='newsDetail-share-hr'></div>
                        <div className='share'>
                            <Share css='align' key={newsDetail.id} item={newsDetail}/>
                        </div>
                    </div>
                    <div className='newsDetail-article newsDetail-article-padding'>
                        <div>
                            <NewsNav newsTypeActive={newsTypeActive} newsIndexChange={this.navChange}/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='flexbl top10 width newsDetail-cont'>
                <div className='newsDetail-cont-left'>
                    
                </div>
                <div className='newsDetail-article'>
                    
                    <div className='newsDetail-article-detail'>
                        <ArticleDetail />
                    </div>
                    <div className='Report-div' id='comment'>
                        <Report />
                    </div>
                    <div style={{height:"0px",width:'100px'}}>

                    </div>
                    <div >
                        <Comment commentNum={(val)=>{this.setState({total:val})}}/>
                    </div>

                </div>
                <div className='newsDetail-author'>
                    <div className='newsDetail-author-info'>
                        <div className='newsDetail-author-info-top fleximgc'>
                            <div className='authorimg fleximg' onClick={()=>this.props.history.push('/app/newsauthormore?creatorId='+newsDetail.creator_id)}>
                                <img src={newsDetail.head_url || headerimg} alt="author" onError={(e) => { e.target.src = headerimg }}/>
                            </div>
                            <div className=''>{hotArticleList.creator_name}</div>
                            <div><FollowButton item={newsDetail} key={newsDetail.creator_id}/></div>
                        </div>
                        <div className='hot'>
                            <div>TA的热门作品</div>
                        </div>
                        <div>
                            {hotArticleList.records && hotArticleList.records.map((item,index)=>(
                                <div 
                                    key={index}
                                    onClick={()=>{this.articleChange(item.id)}}
                                ><AuthorHotArticleItem item={item}/></div>
                            ))}
                        </div>
                        <div className='fleximg more' onClick={this.toNewsAuthor}>
                            <div>查看更多</div>
                            <div className='toimg fleximg'><img src={toimg} alt="to" /></div>
                        </div>
                    </div>
                    {/* <div className='fleximg advertisementimg'>
                        <img src="advertisement" alt="advertisement" />
                    </div> */}
                    <div className='read-rank'>
                        <div className='read-rank-title'>每日阅读榜</div>
                        {readRank.map((item,index)=>(
                            <div 
                                key={index} 
                                className='flexb read-rank-item'
                                onClick={()=>{this.articleChange(item.id)}}
                            >
                                <div className={index<=2?'rank-num-active':'rank-num'}>{index + 1}</div>
                                <div className='read-rank-title-txt'>{item.title}</div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                
            </div>
            {loginShow &&  <PopupLogin />} 
        </div>
    }
    
}