// @ts-nocheck
import { Component } from 'react'
import './articleItem.scss'
import editimg from '../../../public/images/user/edit.png'
import dataimg from '../../../public/images/user/data.png'


export default class ArticleItem extends Component {
    render(){
        let item =this.props.item
        return <div className='flexb article-item'>
          <div className='coverimg fleximg'><img src={dataimg} alt="cover" /></div>
          <div className='flexcbl article-right'>
            <div>
              <div className='title'>{item.title}</div>
              <div className='item-content'>{item.content}</div>
            </div>
            <div className='flexb article-bottom'>
              <div className='article-bottom-detail'>
                <span>{item.time}</span>
                <span className='article-bottom-read'>阅读 {item.read}</span>
                <span>评论 {item.comment}</span>
              </div>
              <div className='flexr'>
                <div className='fleximg article-item-button'>
                  <div className='editimg fleximg'><img src={editimg} alt="editButton" /></div>
                  <div>编辑</div>
                </div>
                <div className='fleximg article-item-button'>
                  <div className='editimg fleximg'><img src={dataimg} alt="dataButton" /></div>
                  <div>数据</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    }
    
}