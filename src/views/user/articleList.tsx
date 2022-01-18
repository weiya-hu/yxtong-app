
import { Component } from 'react'
import './articleList.scss'
import ArticleItem from './component/articleItem'
import { Pagination } from 'antd';
import {contentList} from '../../service/user'

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
      size:10,//每页条数
      asideActive:1,
      total:null
    }

  //获取文章列表
  contentList=async(current,size)=>{
    let data={
      current:current,
      size:size
    }
    const res = await contentList(data)
    if(res.status){
      this.setState({
        list:res.body.records,
        total:res.body.total,
        current:current,
        size:size
      })
    }
  }
  componentDidMount(){
    const {current,size} =this.state
    this.contentList(current,size)
  }
  render(){
    let {list,current,size,total} = this.state
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
          <Pagination 
            onChange={this.contentList}
            total={total} 
            current={current} 
            pageSize={size} 
            size='small'
          />
        </div>
      </div>
  }
    
}