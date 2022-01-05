import { Component, ReactNode } from 'react'
import './authorMore.scss'
import Header from './component/header/header'
import FollowButton from './component/followButton/followButton'
import NewsListItem from './component/newsListItem/newsListItem'
import MoreTxt from './component/moreTxt/moreTxt'
import {util} from '../../utils/news'

import topimg from '../../public/images/user/top.jpg'

export default class AuthorMore extends Component{
    state={
        isLogin:true,//是否登录了
        exitNone:true,//退出登录是否显示
        types:['全部','文章','视频'],
        typeActiveIndex:0,
        newsList:[],
        hasMore:true,
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
            this.loadMoreData()
          }          
          // 并在请求到数据后重新开启监听
          setTimeout(()=>window.addEventListener('scroll', this.handleScroll, false), 300)
          }
    }
    componentDidMount(){

        window.addEventListener('scroll', this.handleScroll, false)
   
        let ary=[]
        for(let i=0;i<7;i++){
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
          ary.push(itm)
        }
        this.setState({
          newsList:ary
        })
      }
    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.handleScroll)

    }
    render(){
        const {isLogin,exitNone,types,typeActiveIndex,newsList,hasMore}=this.state
        return(
            <div className='authorMore'  onClick={()=>{this.setState({exitNone:true})}}>
                <div className='more-header'>
                    <Header 
                        isLogin={isLogin} 
                        exitNone={exitNone} 
                        exitNoneFlag={(val)=>{this.setState({exitNone:val})}}
                    />
                    <div className='blank-div'></div>
                    <div className='more-types-pre fleximg'>
                        
                        <div className='more-top flexcbl'>
                            <div className='more-top-author flexb'>
                                <div className='flexl'>
                                    <div className='fleximg more-headerimg'><img src='header' alt="header" /></div>
                                    <div className='more-auther-name'>央视新闻</div>
                                </div>
                                <div>
                                    <FollowButton item={{follow:false}} size='big'/>
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
                        {newsList.map((item,index)=><div key={index}>
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