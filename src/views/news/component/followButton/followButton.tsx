import { Component } from 'react'
import './followButton.scss'

import addSmallimg from '../../../../public/images/user/addSmall.png'
import addBigimg from '../../../../public/images/user/addBig.png'
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
    item:FollowButtonItem,
    size?:string
}

export default class FollowButton extends Component<FollowButtonState> {
    state={
        item:this.props.item
    }
    follow=()=>{
        setTimeout(()=>{
            let {item} =this.state
            item.follow=!item.follow
            this.setState({item:item})
        },1000)
    }
    render(){
        const {item} = this.state,{size}=this.props
        return size==='big'?(
            // size='big'
            <div onClick={this.follow} className={item.follow?'big-interest-button-gray fleximg':'fleximg big-interest-button'}>
                <div className='followimg fleximg'><img src={item.follow?gouimg:addBigimg} alt="add" /></div>
                <span>{item.follow?'已关注':'关注'}</span>
            </div>
            ): (
            // size='small'或者没传size
            <div onClick={this.follow} className={item.follow?' interest-button-gray fleximg':'fleximg interest-button'}>
                <div className='followimg fleximg'><img src={item.follow?gouimg:addSmallimg} alt="follow" /></div>
                <span>{item.follow?'已关注':'关注'}</span>
            </div>
            
            )
        
    }
    
}