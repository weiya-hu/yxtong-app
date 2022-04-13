//@ts-nocheck
import { Component } from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './mine.scss'
import { withRouter } from "react-router-dom";
import {newsFavorList} from 'service/news'
import {userFans} from 'service/user'
import MoreTxt from 'views/news/component/moreTxt/moreTxt';
import {util} from 'utils/news'
import FollowButton from 'views/news/component/followButton/followButton';

import nodataBigimg from 'public/images/user/nodataBig.png'
import falseimg from 'public/images/user/false.png'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class MyFollow extends Component {
    state={
        topTitle:['我的关注','我的粉丝'],
        topTitleActive:0,
        page:1,
        fansPage:1,
        size:12,
        collectList:[],
        total:0,
        loading:false,
        hasMore: true,// 判断接口是否还有数据，通过接口设置
    }
    loadMoreData=()=>{
        this.getCollection(this.state.topTitleActive)
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
    getCollection=async(index)=>{
        const {page,fansPage,size,collectList} =this.state
        const {status,body}= (index == 1) ? await userFans({current:fansPage,size:size}) : await newsFavorList({current:page,size:size})
        status && this.setState({
            collectList:collectList.concat(body.records),
            // topTitleActive:index,
            hasMore:body.total>(index?fansPage:page)*size,
            page:index?page:page+1,
            fansPage:index?fansPage+1:fansPage,
            total:body.total
        })
    }
    getCollectionFirst=async(index)=>{
        const {page,fansPage,size} =this.state
        this.setState({loading:true})
        const {status,body}= (index == 1) ? await userFans({current:1,size:size}) : await newsFavorList({current:1,size:size})
        this.setState({loading:false})
        status && this.setState({
            collectList:body.records,
            hasMore:body.total>size,
            page:index?page:2,
            fansPage:index?2:fansPage,
            total:body.total
        })
    }
    topTitleChange=(index)=>{
        this.props.history.push('/app/user?componentId=112&contentIndex='+index)
    }
    followChange=(val)=>{
        console.log(val)
        this.props.history.push('/app/user?componentId=112&contentIndex=0&follow=true')
    }
    componentDidMount(){
        let contenId= Number(util.getUrlParam('contentIndex'))
        this.getCollectionFirst((contenId || contenId ==0)?contenId:0)
        this.setState({topTitleActive:(contenId || contenId ==0)?contenId:0})
        window.addEventListener('scroll', this.handleScroll, false)
        //监听路由变化
        UNLISTEN = this.props.history.listen(route => { 
            let contenid=Number(util.getUrlParam('contentIndex'))
            let follow = util.getUrlParam('follow')
            //避免点关注的时候刷新页面，导致页面滚动到最上方
            if(!follow){
                this.setState({
                    topTitleActive:(contenid || contenid ==0)?contenid:0,
                })
                this.getCollectionFirst((contenid || contenid ==0)?contenid:0)
                window.scrollTo (0,0);
            } 
        });
    }
    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.handleScroll)
        this.setState = (state,callback)=>{
          return;
        }
        UNLISTEN && UNLISTEN(); // 监听路由变化执行解绑
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
                    <div className='content-num'>{topTitleActive?'我的粉丝':'我的关注'}：{total}</div>
                    {(collectList.length>0 && topTitleActive == 0) && <div className='myCollect-star'>
                        {collectList.map((item,index)=>(
                        item && <div 
                            key={index}
                            className='myCollect-item flexcc'
                            onClick={()=>{this.props.history.push('/app/newsauthormore?creatorId='+item.creator_id)}}
                        >   
                           <div className='fleximg head myCollect-headimg'><img src={item.head_url } alt="head" onError={(e) => { e.target.src = falseimg }}/></div>
                           <div className='myCollect-name onemore'>{item.name || '用户'}</div>
                           <div>
                                <FollowButton item={item} key={item.is_attention} change={(val)=>{this.setState({total:val.types?total+1:total-1});this.followChange(val)}}/>
                            </div>
                        </div>))}
                    </div>}
                    {(collectList.length>0 && topTitleActive == 1) && <div className='myCollect-star'>
                        {collectList.map((item,index)=>(
                        item && <div 
                            key={index}
                            className='myCollect-item flexcc'
                        >   
                           <div className='fleximg head myCollect-headimg'><img src={item.head || falseimg} alt="head" onError={(e) => { e.target.src = falseimg }}/></div>
                           <div className='myCollect-name onemore'>{item.name || '用户'}</div>
                        </div>))}
                    </div>}
                    {collectList.length === 0 && <div className='myCollect-nodata fleximg'>
                        <div className='nodataBigimg fleximg'>
                            <img src={nodataBigimg} alt="nodata" />
                            <div className='myCollect-nodata-txt'>暂无更多数据</div>
                        </div>
                        
                    </div>}
                    {collectList.length > 0 &&<MoreTxt hasMore={hasMore}/>}
                </Spin>
            </div>
        </div>
    }
    
}

let UNLISTEN;
export default withRouter(MyFollow)