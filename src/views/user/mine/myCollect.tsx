//@ts-nocheck
import { Component } from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './mine.scss'
import {newsCreationcollection} from 'service/news'
import moment from 'moment'
import Collect from 'views/news/component/collect/collect';
import MoreTxt from 'views/news/component/moreTxt/moreTxt';
import {util} from 'utils/news'

import nodataBigimg from 'public/images/user/nodataBig.png'
import falseimg from 'public/images/user/false.png'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default class MyCollect extends Component {
    state={
        topTitle:['收藏的文章','收藏的视频'],
        topTitleActive:0,
        page:1,
        size:4,
        collectList:[],
        total:null,
        loading:false,
        hasMore: true,// 判断接口是否还有数据，通过接口设置
    }
    loadMoreData=()=>{
        this.getCollection()
    }
    // 页面滚动
    handleScroll = () => {
        const {topTitleActive} = this.state
        if(topTitleActive == 0){
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
        
    }
    getCollection=async(index)=>{
        const {page,size,topTitleActive,collectList} =this.state
        const {status,body}= await newsCreationcollection({current:page,size:size})
        status && this.setState({
            collectList:collectList.concat(body.records),
            topTitleActive:(index || index ==0)?index:topTitleActive,
            hasMore:body.total>page*size,
            page:page+1,
            total:body.total
        })
    }
    getCollectionFirst=async(index)=>{
        const {page,size,topTitleActive} =this.state
        this.setState({loading:true})
        const {status,body}= await newsCreationcollection({current:1,size:size})
        this.setState({loading:false})
        status && this.setState({
            collectList:body.records,
            topTitleActive:(index || index ==0)?index:topTitleActive,
            hasMore:body.total>size,
            page:2,
            total:body.total
        })
    }
    topTitleChange=(index)=>{
        const {topTitleActive} =this.state;
        if(index){
            this.setState({
                topTitleActive:index,
                collectList:[],
                total:0
            })
        }else{
            this.getCollectionFirst(index)
            window.scrollTo (0,0);
        }
        
    }
    componentDidMount(){
        this.getCollection()
        window.addEventListener('scroll', this.handleScroll, false)
    }
    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.handleScroll)
        this.setState = (state,callback)=>{
          return;
        }
    }
    render(){
        const {topTitle,topTitleActive,total,loading,collectList,hasMore} = this.state
        return <div id='myCollect'>
            <div className='position-top10'></div>
            <div className='myCollect-top-title'>
                <div className='width position'>
                    <div className='top-title flexl'>
                        {topTitle.map((item,index)=>(
                        <div 
                            key={index}
                            className={topTitleActive == index ? 'top-title-a top-title-item':'top-title-item'}
                            onClick={()=>this.topTitleChange(index)}
                        >{item}</div> ))}
                    </div>
                </div>
            </div>
            <div className='myCollect-content'>
                <Spin indicator={antIcon} spinning={loading}>
                    <div className='content-num'>收藏数量：{total}篇</div>
                    {collectList.length>0 && <div>
                        {collectList.map((item,index)=>(
                        <div 
                            key={item.news_id}
                            className='myCollect-news flexb'
                        >   
                            <div className='thumbimg fleximg'><img src={item.thumb_url || falseimg} alt="thumb_url" onError={(e) => { e.target.src = falseimg }}/></div>
                            <div className='myCollect-news-content flexcbl'>
                                <div>
                                    <div className='myCollect-news-content-title'>{item.title}</div>
                                    <div className='myCollect-news-content-text'>{item.content}</div>
                                </div>
                                <div className='flexb myCollect-news-content-foot'>
                                    <div>收藏成功：{moment(item.collection_time).format('YYYY年MM月DD日')}</div>
                                    <div className='flexl star'><Collect css='justify' success={(val)=>{this.setState({total:val?total+1:total-1});console.log(val)}} item={{is_collection:'1',...item}}/></div>
                                </div>
                            </div>
                        </div>))}
                    </div>}
                    {collectList.length === 0 && <div className='myCollect-nodata fleximg'>
                        <div className='nodataBigimg fleximg'>
                            <img src={nodataBigimg} alt="nodata" />
                            <div className='myCollect-nodata-txt'>暂无更多数据，请耐心等待</div>
                        </div>
                        
                    </div>}
                    {collectList.length > 0 &&<MoreTxt hasMore={hasMore}/>}
                </Spin>
            </div>
        </div>
    }
    
}