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

import toimg from'../../public/images/user/to.png'
import commentBlackimg from '../../public/images/user/commentBlack.png'

export default class NewsDetail extends Component {
    state={
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
        }
    }
    collectChange=(val)=>{
        let articleINfo=JSON.parse(JSON.stringify(this.state.articleINfo)) 
        articleINfo.collect = val
        this.setState({
            articleINfo:articleINfo
        })
    }
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) { anchorElement.scrollIntoView({ behavior: 'smooth'}); }
        }
      }
    componentDidMount(){
        let arr=[]
        for(let i=0;i<5;i++){
            let item={
                title:'马英九发声后，国民党终于拿出一铁证，“台湾属于中国”响彻岛内！',
                read:65,
                time:'一小时前'
            }
            arr.push(item)
        }
        this.setState({
            authorHotList:arr,
            readRank:arr
        })
    }
    render(){
        let {isLogin,articleINfo,author,authorHotList,readRank}=this.state

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
                                <div className='font12'>22</div>
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
                            <NewsNav newsIndexChange={()=>{}}/>
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
                        <Comment />
                    </div>

                </div>
                <div className='newsDetail-author'>
                    <div className='newsDetail-author-info'>
                        <div className='newsDetail-author-info-top fleximgc'>
                            <div className='authorimg fleximg'><img src="" alt="author" /></div>
                            <div className=''>{author.name}</div>
                            <div><FollowButton item={author}/></div>
                        </div>
                        <div className='hot'>
                            <div>TA的热门作品</div>
                        </div>
                        <div>
                            {authorHotList.map((item,index)=>(
                                <div key={index}><AuthorHotArticleItem item={item}/></div>
                            ))}
                        </div>
                        <div className='fleximg more' >
                            <div>查看更多</div>
                            <div className='toimg fleximg'><img src={toimg} alt="to" /></div>
                        </div>
                    </div>
                    <div className='fleximg advertisementimg'>
                        <img src="advertisement" alt="advertisement" />
                    </div>
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