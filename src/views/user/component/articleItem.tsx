//@ts-nocheck
import { Component } from 'react'
import './articleItem.scss'
import {withRouter} from 'react-router-dom'
import { Modal} from 'antd'
import {deleteNews,newsCreationTypeList} from 'service/news'
import {newsPublish} from 'service/user'
import { util } from 'utils/news'
import $message from 'views/component/message'
import store from 'store/index'
import {setUserNewsType} from 'store/actionCreators'

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
  delete:()=>void;
  publish:()=>void;
}

class ArticleItem extends Component<ArticleItemState> {
    state={
      modalVisible:false,
      modalType:null,//1删除2原因3提交
      newsType:[]
    }
    toEdit=(id)=>{
      let event = window.event || arguments.callee.caller.arguments[0]
      console.log(event)
      event.stopPropagation();
      this.props.history.push('/app/user?componentId=71&editNewsId='+id)
    }
    toNewsDetail=(id)=>{
      // this.props.history.push('/app/user?componentId=72&readNewsId='+id);
      window.open('/app/user?componentId=73&readNewsId='+id,"_blank")
    }
    //删除按钮
    deleteNews=(id)=>{
      this.setState({modalType:1})
      this.props.history.push('/app/user?componentId=72&deleteId='+id)
      this.toggleVisible(true)
    }
    //原因按钮
    failReason=()=>{
      this.setState({modalType:2})
      this.toggleVisible(true)
    }
    //提交按钮
    publishNews=()=>{
      this.setState({modalType:3})
      this.toggleVisible(true)
    }

    //对话框确认按钮
    modalSure=(modalType)=>{
      switch(modalType){
        case 1:this.deleteOk();break;
        case 2:this.toggleVisible(false);break;
        case 3:this.publish()
      }
    }
    publish=async()=>{
      const res = await newsPublish(this.props.item)
      this.toggleVisible(false)
      if(res.status){
        $message.info('提交成功')
          this.props.publish(true);
      }
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
    //获取新闻类型
    getNewsType=async()=>{
      const {status,body} = await newsCreationTypeList()
      if(status){
        this.setState({ newsType : body })
        store.dispatch(setUserNewsType(body))
      }
    }
    //根据新闻id找到新闻类型名
    getNewsTypeName=(id)=>{
      if(id){
        const { newsType } = this.state
        let name
        newsType.map(item=>{item.id == id && (name = item.name)})
        return name
      }
    }
    componentDidMount=()=>{
      let userNewsType = store.getState().userNewsType
      userNewsType.length && this.setState({newsType:userNewsType})
      !userNewsType.length && this.getNewsType()
    }
    render(){
        let {item} =this.props
        let {modalVisible,modalType} =this.state
        return <div className='flexb article-item' onClick={()=>{this.toNewsDetail(item.id)}}>
          <div className='coverimg fleximg position'>
            <img src={item.thumb_url} alt="cover" onError={(e) => { e.target.src = falseimg }}/>
            {
              item.type_id &&  <div className='news-types fleximg'>{this.getNewsTypeName(item.type_id)}</div>
            }
            
          </div>
          <div className='flexcbl article-right'>
            <div>
              <div className='title'>{item.title}</div>
              <div className='item-content' dangerouslySetInnerHTML = {{__html:item.content}}></div>
            </div>
            <div className='flexb article-bottom'>
              <div className='article-bottom-detail flexl'>
                {item.state === 0 && <div className='draft fleximg'>草稿</div>}
                {item.state === 1 && <div className='review fleximg'>审核中</div>}
                {(item.state === 3 || item.state === 4) && <div className='over fleximg'>已通过</div>}
                {item.state === 2 && <div className='refuse fleximg'>已驳回</div>}
                <span>{item.time}</span>
                <span className='article-bottom-read'>阅读 {item.readed}</span>
                <span>评论 {item.commented}</span>
              </div>
              <div className='flexr'>
                {item.state === 2 && 
                  <div className='fleximg article-item-button' onClick={(e)=>{this.failReason();e.stopPropagation()}}>
                    <div className='editimg fleximg'><img src={resonimg} alt="deleteButton" /></div>
                    <div>原因</div>
                  </div>
                }
                <div className='fleximg article-item-button' onClick={(e)=>{this.deleteNews(item.id);e.stopPropagation()}}>
                  <div className='editimg fleximg'><img src={deleteimg} alt="deleteButton" /></div>
                  <div>删除</div>
                </div>
                {(item.state === 2 || item.state === 0) &&
                  <div className='fleximg article-item-button' onClick={(e)=>{this.toEdit(item.id);e.stopPropagation();}}>
                    <div className='editimg fleximg'><img src={editimg} alt="editButton" /></div>
                    <div>编辑</div>
                  </div>
                }
                {(item.state === 0) &&
                  <div className='fleximg article-item-button' onClick={(e)=>{this.publishNews();e.stopPropagation();}}>
                    <div className='editimg fleximg'><img src={submitimg} alt="editButton" /></div>
                    <div>提交</div>
                  </div>
                }
                {/* {(item.state === 3 || item.state === 4) &&
                  <div className='fleximg article-item-button' onClick={(e)=>{this.toEdit(item.id);e.stopPropagation();}}>
                    <div className='editimg fleximg'><img src={dataimg} alt="editButton" /></div>
                    <div>数据</div>
                  </div>
                }` */}
              </div>
            </div>
          </div>
          <Modal
            title={modalType === 2?'驳回原因':'操作提示'}
            visible={modalVisible}
            onCancel={(e,)=>{this.toggleVisible(false);e.stopPropagation()}}
            onOk={(e,)=>{this.modalSure(modalType);e.stopPropagation()}}
            wrapClassName='article-modal'
            maskStyle={{background: 'rgba(0, 0, 0,0.5)'}}
            cancelText='取消'
            okText='确认'
          >   
            <div className='delete-text'>{modalType === 1?'是否确认删除？':modalType === 2?item.fail_reason:modalType === 3?'是否确认提交？':''}</div>
          </Modal>
         
        </div>
    }
    
}
export default withRouter(ArticleItem)