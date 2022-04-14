//@ts-nocheck
import { Component } from 'react'
import {util} from 'utils/news'
import 'views/user/article.scss'
import {promoteIndustry,promoteArticlePage} from 'service/user'
import Extend from 'views/user/component/extend/extend'
import MoreTxt from 'views/news/component/moreTxt/moreTxt';
import moment from 'moment'
import Share from 'views/news/component/share/share'

import nodataBigimg from 'public/images/user/nodataBig.png'
import falseimg from 'public/images/user/false.png'
import shareNumimg from 'public/images/user/shareNum.png'
import readimg from 'public/images/user/read.png'

export default class Article extends Component {
  state={
    IndustryList:[],
    IndustryActive:0,
    current:1,
    size:10,
    articleList:[],
    hasMore:true
  }
  star=async()=>{
    const promoteIndustryRes = await promoteIndustry();
    let list=[{name: "全部", id: null}]
    promoteIndustryRes.status&& this.setState({
      IndustryList:list.concat(promoteIndustryRes.body),
    })
    this.firstArticleList()
  }
  loadMoreData=()=>{
    this.getArticleList()
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
  firstArticleList=async(id ?:string)=>{
    const {size} = this.state
    const {status,body} = await promoteArticlePage({current:1,size,promoteIndustryId:id || null});
    status&& this.setState({
      articleList:body.records,
      hasMore:body.total>size,
      current:2,
      total:body.total
    })
  }
  getArticleList=async()=>{
    const {size,current,IndustryActive,IndustryList,articleList} = this.state
    const {status,body} = await promoteArticlePage({current,size,promoteIndustryId:IndustryList[IndustryActive].id});
    status && this.setState({
      articleList:articleList.concat(body.records) ,
      hasMore:body.total>current*size,
      current:current+1,
      total:body.total
    })
  }
  articleTypeChange=(item,index)=>{
    this.firstArticleList(item.id)
    this.setState({
      IndustryActive:index
    })
    
  }
  componentDidMount(){
    this.star()
    window.addEventListener('scroll', this.handleScroll, false)
  }
  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll)
    this.setState = (state,callback)=>{
      return;
    }
  }
  render(){
    const {IndustryList,IndustryActive,hasMore,articleList} =this.state
    return <div id='article'>
      <div className='article-content'>
        <div className='extend-top-item'>
          <div className='width position'>
            <div className='article-top'>
              <Extend />
              <div className='article-industry-type'>
                <div className='article-industry-type-txt'>行业分类</div>
                <div className='flexl'>
                  {IndustryList.map((item,index)=><div 
                    key={item.id}
                    onClick={()=>this.articleTypeChange(item,index)}
                    className={IndustryActive == index ?'article-industry-type-item article-industry-type-item-a fleximg':'article-industry-type-item fleximg'}
                  >{item.name}</div> )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {articleList.length>0 && <div>
            {articleList.map((item,index)=>(
            <div            
              key={item.id}
              className='myCollect-news flexb'
              onClick={()=>window.open('/app/user?componentId=44&articleId='+item.id,"_blank")}
            >   
              <div className='thumbimg fleximg'><img src={item.thumb_url || falseimg} alt="thumb_url" onError={(e) => { e.target.src = falseimg }}/></div>
              <div className='myCollect-news-content flexcbl'>
                <div>
                  <div className='myCollect-news-content-title'>{item.title}</div>
                  <div className='myCollect-news-content-text'>{item.content}</div>
                </div>
                <div className='flexb myCollect-news-content-foot'>
                  <div className='color3'>{item.creator_name}</div>
                  <div className='flexr news-foot-right'>
                    <div className='color3'>{moment(item.update_time).format('YYYY年MM月DD日')}</div>
                    <Share css='justify' item={item}/>
                    <div className='color3 flexr'>
                      <div className='shareNumimg fleximg'><img src={shareNumimg} alt="share" /></div>{item.shared}
                    </div>
                    <div className='color3 flexr'>
                      <div className='shareNumimg fleximg'><img src={readimg} alt="share" /></div>{item.readed}
                    </div>
                  </div>
                </div>
              </div>
            </div>))}
          </div>}
          {articleList.length === 0 && <div className='myCollect-nodata fleximg'>
            <div className='nodataBigimg fleximg'>
              <img src={nodataBigimg} alt="nodata" />
              <div className='myCollect-nodata-txt'>暂无更多数据</div>
            </div>
          </div>}
          {articleList.length > 0 && <MoreTxt hasMore={hasMore}/>}
        </div>
      </div>
    </div>
  }
    
}