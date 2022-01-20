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
import {newsDetail,newsReadList,newsWorksList,addReadLog} from '../../service/news'

import toimg from'../../public/images/user/to.png'
import commentBlackimg from '../../public/images/user/commentBlack.png'
import headerimg from '../../public/images/user/header.png'
import message  from '../component/message/index';

// let timer=null
export default class NewsDetail extends Component {
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
        total:null
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
        if(!id){
            id = window.location.href.split('=')[1]
            console.log(window.location.href)
        }
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
        let {newsDetail} =this.state
        this.props.history.push('/app/newsauthormore/?creatorId='+newsDetail.creator_id)
    }
    //点击nav跳转新闻列表
    navChange=(val,item,flag)=>{
        flag && this.props.history.push({ pathname : '/app/news' , query : {index : val,item:item}})
    }
    //详情页文章切换
    articleChange=(id)=>{
        this.props.history.push('/app/newsdetail/?newsId='+id)
        window.location.reload()
    }
    //计时获得积分
    getReadLog=()=>{
        timer=setTimeout(()=>{
            let data={"news_id":window.location.href.split('=')[1]}
            addReadLog(data).then(res=>{
                res.status && message.info('浏览获得积分')
            })
        },10000)
        
    }
    componentDidMount(){
        this.getNewsDetail()
        this.newsReadLists()
        this.getHotArticleList()
        // this.getReadLog()
    }
    componentWillUnmount(){
        // clearInterval(timer)
    }
    render(){
        let {newsTypeActive,total,readRank,newsDetail,hotArticleList}=this.state

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
                        <ArticleDetail newsDetail={newsDetail}/>
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
                            <div className='authorimg fleximg'><img src={newsDetail.head_ur?newsDetail.head_url:headerimg} alt="author" onError={(e) => { e.target.src = headerimg }}/></div>
                            <div className=''>{hotArticleList.creatorName}</div>
                            <div><FollowButton item={newsDetail} key={newsDetail.creator_id}/></div>
                        </div>
                        <div className='hot'>
                            <div>TA的热门作品</div>
                        </div>
                        <div>
                            {hotArticleList.worksList && hotArticleList.worksList.map((item,index)=>(
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
        </div>
    }
    
}