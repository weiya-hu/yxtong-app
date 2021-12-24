
import { Component } from 'react';
import './newsListItem.scss';
import FollowButton from '../followButton/followButton';
import Collect from '../collect/collect';
import Share from '../share/share';

import shareimg from '../../../../public/images/user/share.png'
import shareActiveimg from '../../../../public/images/user/shareActive.png'
import readimg from '../../../../public/images/user/read.png'

interface item{
  title:string
  content:string
  time:string
  read:number,
  from:string
  star:boolean,
  share :boolean,
  follow:boolean,
}

interface NewsListItemState{
  item:item
}

export default class NewsListItem extends Component<NewsListItemState>{
  render(){
    let item = this.props.item
    return(
      <div className='news-list-item flexb'>
        <div className='fleximg coverimg'><img src={readimg} alt="cover" /></div>
        <div className='flexcbl news-list-item-right'>
          <div>
            <div className='title'>{item.title}</div>
            <div className='item-content'>{item.content}</div>
          </div>
          <div className='flexb news-list-item-bottom'>
            <div className='color3'>{item.from}</div>
            <div className='flexr'>
              <div className='color3'>{item.time}</div>
              <div className='flexl share'>
                <Share css='justify' />
              </div>
              <div className='flexl star'>
                <Collect css='justify' collect={item.star}/>
              </div>
              <div className='flexl'>
                <div className='fleximg readimg'><img src={readimg} alt="read" /></div>
                <span className='color3'>{item.read}</span>
              </div>
              <div>
                <FollowButton item={item}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}