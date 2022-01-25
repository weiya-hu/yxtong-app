//@ts-nocheck
import { Component, ReactNode } from 'react'
import './authorMore.scss'
import Header from './component/header/header'
import FollowButton from './component/followButton/followButton'
import NewsListItem from './component/newsListItem/newsListItem'
import MoreTxt from './component/moreTxt/moreTxt'
import {util} from 'utils/news'
import {newsWorksList } from 'service/news'

import headerimg from 'public/images/user/header.png'

export default class AuthorMore extends Component{
    state={
        types:['全部','文章'],
        typeActiveIndex:0,
        newsList:[],
        hasMore:true,
        authorInfo:null,
        current:1,
        size:10,
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
        if(util.getIsTOBottom() < 10){
          // 解除绑定
          window.removeEventListener('scroll', this.handleScroll ,false);
          // 在这里发送请求
          if(this.state.hasMore){
            this.getArticleList()
          }          
          // 并在请求到数据后重新开启监听
          setTimeout(()=>window.addEventListener('scroll', this.handleScroll, false), 300)
          }
    }
    getArticleList=async()=>{
      let url = window.location.href
      let id=url.substring(url.indexOf('=')+1,url.length)
      let {current,size,newsList}=this.state
      let data={
        creatorId:id,
        current:current,
        size:size
      }
      let res = await newsWorksList(data)
      res.status && this.setState({
        authorInfo:res.body,
        newsList:newsList.concat(res.body.worksList),
        hasMore:res.body.total>current*size,
        current:res.body.total>current*size?current+1:current
      })
    }
    //跳转新闻页
    toNewsDetail=(item)=>{
      // this.props.history.push( { pathname : '/app/newsdetail/?newsId='+item.id})
      window.open(window.location.protocol+'//'+window.location.host+'/app/newsdetail?newsId='+item.id, "_blank"); 
    }
    componentDidMount(){
      this.getArticleList()
      window.addEventListener('scroll', this.handleScroll, false)
      document.title = '康州数智-新闻资讯'
    }
    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.handleScroll)
    }
    render(){
        const {types,typeActiveIndex,newsList,hasMore,authorInfo}=this.state
        return(
            <div className='authorMore'>
                <div className='more-header'>
                    <Header />
                    <div className='blank-div'></div>
                    <div className='more-types-pre fleximg'>
                        
                        <div className='more-top flexcbl'>
                            <div className='more-top-author flexb'>
                                <div className='flexl'>
                                    <div className='fleximg more-headerimg'>
                                      <img 
                                        src={authorInfo && authorInfo.header_url?authorInfo.header_url:headerimg} 
                                        alt="header" 
                                        onError={(e) => { e.target.src = headerimg }}
                                      />
                                    </div>
                                    <div className='more-auther-name'>{authorInfo && authorInfo.creatorName}</div>
                                </div>
                                <div>
                                    <FollowButton item={{is_attention:null}} size='big'/>
                                </div>
                            </div>
                            <div className='flexl'>
                                {types.map((item,index)=><div 
                                    key={index}
                                    className={typeActiveIndex===index?'more-top-type more-top-type-active':'more-top-type'}
                                    onClick={()=>{this.setState({typeActiveIndex:index}); window.scrollTo (0,0);}}
                                >{item}</div> )}
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='width'>
                    <div className='more-newslist'>
                        {newsList.map((item,index)=><div key={index} onClick={()=>this.toNewsDetail(item)}>
                            <NewsListItem item={item} size='big'/>   
                        </div> )}
                        <div>
                            <MoreTxt hasMore={hasMore}/>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}