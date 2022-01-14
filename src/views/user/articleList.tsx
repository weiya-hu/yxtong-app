
import { Component } from 'react'
import './articleList.scss'
import ArticleItem from './component/articleItem'
import { Pagination } from 'antd';

interface ArticleItemState{
  imgurl:string;
  title:string;
  content:string;
  time:string;
  read:number,
  comment:number,
}
interface ArticleListState{
  edit:(val:number)=>void
  articleDetail:(val:number)=>void
  dataAnalysis:(val:number)=>void
}

export default class ArticleList extends Component<ArticleListState>{

    state={
      list:[],//文章列表
      current:1,//分页当前页
      pageSize:5,//每页条数
      asideActive:1,
      isArticleDetail:0
    }

  
  componentDidMount(){
    let arr=[]
    for(let i=0;i<10;i++){
      let item:ArticleItemState = {
        imgurl:'dfsfsdf',
        title:'马英九发声后，国民党终于拿出一铁证，“台湾属于中国”响彻岛内！',
        content:'今年9月份，前台湾地区领导人马英九在参加一场新书发布会接受媒体采访时，拿出了台湾属于中国的铁证，当时，马英九表示，《开罗宣言》中明确指出，“日本盗窃中国的领土，例如东北三省，台湾等等',
        time:'2021年9月23日',
        read:3029,
        comment:2039,
      }
      arr.push(item)
      this.setState({
        list:arr
      })
    }
  }
  render(){
    let list = this.state.list
      return <div className='article-list'>
        <div className='content-txt'>内容管理</div>
        {list.map((item,index)=><div className='list-item'>
            <ArticleItem 
              item={item} 
              //传回来的val是true则asideActive是0，跳转编辑页面
              edit={(val:boolean)=>{this.props.edit(val?0:1)}} 
              //传回来的val是true则asideActive是2，跳转数据分析页面
              dataAnalysis={(val)=>{this.setState({asideActive:val?2:1});this.props.dataAnalysis(val?2:1)}} 
              //传回来的val是true则isArticleDetail是1，跳转文章详情页面
              articleDetail={(val)=>{this.props.articleDetail(val?1:0)}}
            />
          </div>
        )}   
        <div className='flexr pagination paginations'>
          <Pagination total={list.length} current={this.state.current} pageSize={this.state.pageSize} size='small'/>
        </div>
      </div>
  }
    
}