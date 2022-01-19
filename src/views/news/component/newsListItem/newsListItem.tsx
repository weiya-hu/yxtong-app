//@ts-nocheck
import { Component } from 'react';
import './newsListItem.scss';
import FollowButton from '../followButton/followButton';
import Collect from '../collect/collect';
import Share from '../share/share';
import moment from 'moment'

import readimg from '../../../../public/images/user/read.png'
import falseimg from '../../../../public/images/user/false.png'

interface item{
  time:string
  read:number
  star:boolean
  share :boolean
  follow:boolean

  commented: 1
  content: "sbhfahwjkdj"
  creator_id: 1
  creator_name: "微信"
  id: "233"
  is_attention: "1"
  is_collection: "1"
  readed: 8
  thumb_url: "xx/xxx/xxxx"
  title: "xxx"
  update_time: 1641520819085
}

interface NewsListItemState{
  item:item
  size?:string
}

export default class NewsListItem extends Component<NewsListItemState>{
  render(){
    let {item,size} = this.props
    if(item){    
      return(
        <div className='news-list-item flexb'>
          <div className='fleximg coverimg'><img src={item.thumb_url?item.thumb_url:falseimg} alt="cover" onError={(e) => { e.target.src = falseimg }}/></div>
          <div className={size==='big'?'flexcbl news-list-item-right  news-list-item-right-big':'flexcbl news-list-item-right'} >
            <div>
              <div className='title'>{item.title}</div>
              <div className='item-content' dangerouslySetInnerHTML = {{__html:item.content}}></div>
            </div>
            <div className='flexb news-list-item-bottom'>
              <div className='color3'>{item.creator_name}</div>
              <div className='flexr'>
                <div className='color3'>{moment(item.update_time).format('YYYY年MM月DD日')}</div>
                <div className='flexl share'>
                  <Share css='justify' item={item}/>
                </div>
                <div className='flexl star'>
                  <Collect css='justify' item={item}/>
                </div>
                <div className='flexl'>
                  <div className='fleximg readimg'><img src={readimg} alt="read" /></div>
                  <span className='color3'>{item.readed}</span>
                </div>
                <div>
                  {!(size==='big') && <FollowButton item={item} userInfo={(val)=>{}}/>}                
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return <div></div>
    }
  }
}