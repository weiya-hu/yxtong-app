//@ts-nocheck
import { Component } from 'react'
import './articleItem.scss'
import {withRouter} from 'react-router-dom'
import { Modal} from 'antd'
import {deleteNews} from 'service/news'
import { util } from 'utils/news'
import $message from 'views/component/message'

import editimg from 'public/images/user/edit.png'
import falseimg from 'public/images/user/false.png'
import deleteimg from 'public/images/user/delete.png'
import submitimg from 'public/images/user/submit.png'
import resonimg from 'public/images/user/reson.png'
import dataimg from 'public/images/user/data.png'
 
const { confirm } = Modal;
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
  delete:(val:boolean)=>void;
}

class ArticleItem extends Component<ArticleItemState> {
    state={
      modalVisible:false
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
    //删除按钮
    deleteNews=(id)=>{
      this.props.history.push('/app/user?navActiveIndex=2&asideActive=1&deleteId='+id)
      this.toggleVisible(true)
    }
    //删除确认按钮
    deleteOk=()=>{
      console.log(util.getUrlParam('deleteId'))
      deleteNews({news_id:util.getUrlParam('deleteId')}).then(res=>{
        if(res.status){
          $message.info(res.message);
          this.props.delete(true);
        }
        this.toggleVisible(true)
      })
      
    }
    //删除modal是否显示切换
    toggleVisible=(val)=>{
      this.setState({modalVisible:val})
    }
    render(){
        let {item} =this.props
        let {modalVisible} =this.state
        return <div className='flexb article-item' onClick={()=>{this.toNewsDetail(item.id)}}>
          <div className='coverimg fleximg'><img src={item.thumb_url} alt="cover" onError={(e) => { e.target.src = falseimg }}/></div>
          <div className='flexcbl article-right'>
            <div>
              <div className='title'>{item.title}</div>
              <div className='item-content' dangerouslySetInnerHTML = {{__html:item.content}}></div>
            </div>
            <div className='flexb article-bottom'>
              <div className='article-bottom-detail flexl'>
                {item.state === 1 && <div className='draft fleximg'>草稿</div>}
                {item.state === 2 && <div className='review fleximg'>审核中</div>}
                {item.state === 3 && <div className='over fleximg'>已通过</div>}
                {item.state === 4 && <div className='refuse fleximg'>已驳回</div>}
                <span>{item.time}</span>
                <span className='article-bottom-read'>阅读 {item.readed}</span>
                <span>评论 {item.commented}</span>
              </div>
              <div className='flexr'>
                {item.state === 4 && 
                  <div className='fleximg article-item-button' onClick={(e)=>{this.deleteNews(item.id);e.stopPropagation()}}>
                    <div className='editimg fleximg'><img src={resonimg} alt="deleteButton" /></div>
                    <div>原因</div>
                  </div>
                }
                <div className='fleximg article-item-button' onClick={(e)=>{this.deleteNews(item.id);e.stopPropagation()}}>
                  <div className='editimg fleximg'><img src={deleteimg} alt="deleteButton" /></div>
                  <div>删除</div>
                </div>
                {(item.state === 4 || item.state === 1) &&
                  <div className='fleximg article-item-button' onClick={(e)=>{this.toEdit(item.id);e.stopPropagation();}}>
                    <div className='editimg fleximg'><img src={editimg} alt="editButton" /></div>
                    <div>编辑</div>
                  </div>
                }
                {(item.state === 1) &&
                  <div className='fleximg article-item-button' onClick={(e)=>{this.toEdit(item.id);e.stopPropagation();}}>
                    <div className='editimg fleximg'><img src={submitimg} alt="editButton" /></div>
                    <div>提交</div>
                  </div>
                }
                {(item.state === 3) &&
                  <div className='fleximg article-item-button' onClick={(e)=>{this.toEdit(item.id);e.stopPropagation();}}>
                    <div className='editimg fleximg'><img src={dataimg} alt="editButton" /></div>
                    <div>数据</div>
                  </div>
                }
              </div>
            </div>
          </div>
          <Modal
            title="操作提示"
            visible={modalVisible}
            onCancel={(e,)=>{this.toggleVisible(false);e.stopPropagation()}}
            onOk={(e,)=>{this.deleteOk();e.stopPropagation()}}
            wrapClassName='article-modal'
            maskStyle={{background: 'rgba(0, 0, 0,0.5)'}}
            cancelText='取消'
            okText='确认'
          >   
            <div className='delete-text'>是否确认删除？</div>
          </Modal>
        </div>
    }
    
}
export default withRouter(ArticleItem)