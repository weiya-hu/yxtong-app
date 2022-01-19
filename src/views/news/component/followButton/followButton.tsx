import { Component } from 'react'
import './followButton.scss'
import PopupLogin from '../../../login/popupLogin'
import {doAttention} from '../../../../service/news'
import $message from '../../../component/message/index'

import addSmallimg from '../../../../public/images/user/addSmall.png'
import addBigimg from '../../../../public/images/user/addBig.png'
import gouimg from '../../../../public/images/user/gou.png'

interface FollowButtonItem{
    is_attention:string | null
    creator_id?:number
}

interface FollowButtonProps{
    item?:FollowButtonItem,
    size?:string,
    userInfo?:(val)=>void
}

export default class FollowButton extends Component<FollowButtonProps> {
    state={
        item:this.props.item,
        loginShow:false
    }
    follow=async(event)=>{
        event.stopPropagation() 
        let {item} =JSON.parse(JSON.stringify(this.state)) 
        let data={
            "creator_id":item.creator_id?item.creator_id:Number(window.location.href.split('=')[1]) ,
            "types": item.is_attention?0:1
        }
        const res =await doAttention(data)
        if(res.status){
            $message.info(data.types?'关注成功':'取消关注')
            item.is_attention=!item.is_attention?'1':null
            this.setState({item:item})
        }
    }
    render(){
        const {item,loginShow} = this.state,{size}=this.props
        return size==='big'?(
            // size='big'
            <div onClick={this.follow} className={item.is_attention?'big-interest-button-gray fleximg':'fleximg big-interest-button'}>
                <div className='followimg fleximg'><img src={item.is_attention?gouimg:addBigimg} alt="add" /></div>
                <span>{item.is_attention?'已关注':'关注'}</span>
                {loginShow &&  <PopupLogin 
                    show={(val)=>{this.setState({loginShow:val});document.body.style.overflow='auto'}}
                    userInfo={(val)=>{this.setState({userInfo:val});this.props.userInfo(val)}}
                />} 
            </div>
            ): (
            // size='small'或者没传size
            <div onClick={this.follow} className={item.is_attention?' interest-button-gray fleximg':'fleximg interest-button'}>
                <div className='followimg fleximg'><img src={item.is_attention?gouimg:addSmallimg} alt="is_attention" /></div>
                <span>{item.is_attention?'已关注':'关注'}</span>
                {loginShow &&  <PopupLogin 
                    show={(val)=>{this.setState({loginShow:val});document.body.style.overflow='auto'}}
                    userInfo={(val)=>{this.setState({userInfo:val});this.props.userInfo(val)}}
                />} 
            </div>
            
            )
        
    }
    
}