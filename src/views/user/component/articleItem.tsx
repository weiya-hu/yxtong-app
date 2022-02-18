//@ts-nocheck
import { Component } from 'react'
import './articleItem.scss'
import {withRouter} from 'react-router-dom'
import { Modal, Button } from 'antd'
import editimg from 'public/images/user/edit.png'
import falseimg from 'public/images/user/false.png'
import deleteimg from 'public/images/user/delete.png'


interface Item{
  commented: number
  content: string
  creator_id: number
  id: string
  readed: number
  thumb_url: string
  title: string
  update_time: number
}
interface ArticleItemState{
  item:Item;
  edit:(val:boolean)=>void;
  dataAnalysis:(val:boolean)=>void;
  articleDetail:(val:boolean)=>void;
}

class ArticleItem extends Component<ArticleItemState> {
  constructor(props,ArticleItemState){
    super(props)
  }
    toEdit=(id)=>{
      let event = window.event || arguments.callee.caller.arguments[0]
      console.log(event)
      event.stopPropagation();
      this.props.history.push('/app/user?navActiveIndex=2&asideActive=0&editNewsId='+id)
    }
    toNewsDetail=(id)=>{
      this.props.history.push('/app/user?navActiveIndex=2&asideActive=1&readNewsId='+id);
    }
    deleteNews=(id)=>{
     
    }
    render(){
        let {item} =this.props
        return <div className='flexb article-item' onClick={()=>{this.toNewsDetail(item.id)}}>
          <div className='coverimg fleximg'><img src={item.thumb_url} alt="cover" onError={(e) => { e.target.src = falseimg }}/></div>
          <div className='flexcbl article-right'>
            <div>
              <div className='title'>{item.title}</div>
              <div className='item-content' dangerouslySetInnerHTML = {{__html:item.content}}></div>
            </div>
            <div className='flexb article-bottom'>
              <div className='article-bottom-detail'>
                <span>{item.time}</span>
                <span className='article-bottom-read'>阅读 {item.readed}</span>
                <span>评论 {item.commented}</span>
              </div>
              <div className='flexr'>
                {/* <div className='fleximg article-item-button' onClick={()=>{this.deleteNews(item.id)}}>
                  <div className='editimg fleximg'><img src={deleteimg} alt="deleteButton" /></div>
                  <div>删除</div>
                </div> */}
                <div className='fleximg article-item-button' onClick={(e)=>{this.toEdit(item.id);e.stopPropagation();}}>
                  <div className='editimg fleximg'><img src={editimg} alt="editButton" /></div>
                  <div>编辑</div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
    }
    
}
export default withRouter(ArticleItem)