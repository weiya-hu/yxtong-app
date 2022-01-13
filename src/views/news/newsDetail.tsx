//@ts-nocheck
import { Component } from 'react'
import './newsDetail.scss'
import Header from './component/header/header'
import NewsNav from './component/newsNav/newsNav';
import ArticleDetail from '../user/articleDetail';
import FollowButton from './component/followButton/followButton';
import AuthorHotArticleItem from './component/authorHotArticleItem/authorHotArticleItem';
import Collect from './component/collect/collect';
import Share from './component/share/share';
import Report from './component/report/report';
import Comment from './component/comment/comment';
import {newsDetail,newsReadList,newsWorksList} from '../../service/news'

import toimg from'../../public/images/user/to.png'
import commentBlackimg from '../../public/images/user/commentBlack.png'

export default class NewsDetail extends Component {
    state={
        newsTypeActive:0,
        isLogin:true,//是否登录了
        author:{
            name:'央视新闻',
            follow:false
        },//作者信息
        authorHotList:[],//作者热门作品
        readRank:[],//每日阅读榜
        articleINfo:{
            comment:22,
            collect:false,
            share:false
        },
        newsDetail:null,
        newsProps:this.props.location.query,
        newsId:null,
        hotArticleList:{}
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
    getNewsDetail=async()=>{
        let id = window.location.search.split('=')[1]
        this.setState({newsId:id})
        let data={
            newsId:id
        }
        let res =await newsDetail(data)
        if(res.status){
            this.setState({
                newsDetail:res.body
            })
        }
    }
    //每日阅读榜
    newsReadLists=async () => {
        let res = await newsReadList({current:1,size:5})
        res.status && this.setState({
            readRank:res.body.readList
        })
    }
    //作者信息和作品列表
    getHotArticleList=async () => {
        //to do list,creatorId
        let res = await newsWorksList({creatorId:1,current:1,size:5})
        res.status && this.setState({
            hotArticleList:res.body
        })
    }
    //跳转作者作品页
    toNewsAuthor=()=>{
        //to do list,creatorId
        this.props.history.push('/app/newsauthormore/?creatorId='+1)
    }
    //点击nav跳转新闻列表
    navChange=(val,item,flag)=>{
        flag && this.props.history.push({ pathname : '/app/news' , query : {index : val,item:item}})
    }
    componentDidMount(){
        this.getNewsDetail()
        this.newsReadLists()
        this.getHotArticleList()
    }
    render(){
        let {newsTypeActive,articleINfo,author,authorHotList,readRank,newsDetail,hotArticleList}=this.state

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
                                <div className='font12'>{newsDetail?newsDetail.commented:''}</div>
                            </div>
                            </a> 
                        <div className='newsDetail-share-hr'></div>
                        <div className='collect'>
                            <Collect collect={articleINfo.collect} css='align'/>
                        </div>
                        <div className='newsDetail-share-hr'></div>
                        <div className='share'>
                            <Share css='align' />
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
                        <ArticleDetail newsDetail={newsDetail}/>
                    </div>
                    <div className='Report-div' id='comment'>
                        <Report />
                    </div>
                    <div style={{height:"0px",width:'100px'}}>

                    </div>
                    <div >
                        <Comment/>
                    </div>

                </div>
                <div className='newsDetail-author'>
                    <div className='newsDetail-author-info'>
                        <div className='newsDetail-author-info-top fleximgc'>
                            <div className='authorimg fleximg'><img src={newsDetail} alt="author" /></div>
                            <div className=''>{hotArticleList.creatorName}</div>
                            <div><FollowButton item={author}/></div>
                        </div>
                        <div className='hot'>
                            <div>TA的热门作品</div>
                        </div>
                        <div>
                            {hotArticleList.worksList && hotArticleList.worksList.map((item,index)=>(
                                <div key={index}><AuthorHotArticleItem item={item}/></div>
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
                            <div key={index} className='flexb read-rank-item'>
                                <div className={index<=2?'rank-num-active':'rank-num'}>{index + 1}</div>
                                <div className='read-rank-title-txt'>{item.title}</div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                
            </div>
        </div>
    }
    
}