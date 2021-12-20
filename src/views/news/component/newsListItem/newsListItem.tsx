//@ts-nocheck
import { Component } from 'react';
import './newsListItem.scss';

import shareimg from '../../../../public/images/user/share.png'
import shareActiveimg from '../../../../public/images/user/shareActive.png'
import starimg from '../../../../public/images/user/star.png'
import starActiveimg from '../../../../public/images/user/starActive.png'
import readimg from '../../../../public/images/user/read.png'
import addSmallimg from '../../../../public/images/user/addSmall.png'
import gouimg from '../../../../public/images/user/gou.png'

export default class NewsListItem extends Component{
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
                <div className='fleximg shareimg'><img src={item.share?shareActiveimg:shareimg} alt="share" /></div>
                <span className={item.share?'share-active':'color3'}>分享</span>
              </div>
              <div className='flexl star'>
                <div className='fleximg starimg'><img src={item.star?starActiveimg:starimg} alt="star" /></div>
                <span className={item.star?'star-active':'color3'}>收藏</span>
              </div>
              <div className='flexl'>
                <div className='fleximg readimg'><img src={readimg} alt="read" /></div>
                <span className='color3'>{item.read}</span>
              </div>
              <div className={item.follow?' interest-button-gray fleximg':'fleximg interest-button'}>
                <div className='followimg fleximg'><img src={item.follow?gouimg:addSmallimg} alt="follow" /></div>
                <span>{item.follow?'已关注':'关注'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}