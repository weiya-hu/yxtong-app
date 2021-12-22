import { Component } from 'react'
import './followButton.scss'

import addSmallimg from '../../../../public/images/user/addSmall.png'
import gouimg from '../../../../public/images/user/gou.png'

interface FollowButtonItem{
    name?:string,
    follow:boolean,
    title?:string
    content?:string
    time?:string
    read?:number,
    from?:string
    star?:boolean,
    share ?:boolean,
}

interface FollowButtonState{
    item:FollowButtonItem
}

export default class FollowButton extends Component<FollowButtonState> {
    
    render(){
        let item = this.props.item
        return <div className={item.follow?' interest-button-gray fleximg':'fleximg interest-button'}>
            <div className='followimg fleximg'><img src={item.follow?gouimg:addSmallimg} alt="follow" /></div>
            <span>{item.follow?'已关注':'关注'}</span>
        </div>
    }
    
}