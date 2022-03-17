import { Component } from 'react'
import './followButton.scss'
import {doAttention} from 'service/news'
import $message from 'views/component/message/index'
import {util} from 'utils/news'

import store from 'store';
import {loginShow} from 'store/actionCreators'

import addSmallimg from 'public/images/user/addSmall.png'
import addBigimg from 'public/images/user/addBig.png'
import gouimg from 'public/images/user/gou.png'

interface FollowButtonItem{
    is_attention:string | null
    creator_id?:number
}

interface FollowButtonProps{
    item?:FollowButtonItem,
    size?:string,
    userInfo?:(val)=>void,
    change?:(val)=>void,
}

export default class FollowButton extends Component<FollowButtonProps> {
    state={
        item:this.props.item
    }
    follow=async(event)=>{
        event.stopPropagation() 
        let userInfo =store.getState().userInfo
        if(userInfo){
            let {item} =JSON.parse(JSON.stringify(this.state)) 
            // let url = window.location.href
            // let reatorId=url.substring(url.indexOf('=')+1,url.length)
            let reatorId = util.getUrlParam('creatorId')
            let data={
                "creator_id":item.creator_id?item.creator_id:Number(reatorId) ,
                "types": item.is_attention?0:1
            }
            const res =await doAttention(data)
            if(res.status){
                $message.info(data.types?'关注成功':'取消关注')
                item.is_attention=!item.is_attention?'1':null
                this.setState({item:item})
                this.props.change(data)  
            }
        }else{
            store.dispatch(loginShow())
        }
        
    }
    
    render(){
        const {item} = this.state,{size}=this.props
        return size==='big'?(
            // size='big'
            <div onClick={this.follow} className={item.is_attention?'big-interest-button-gray fleximg pointer':'fleximg big-interest-button pointer'}>
                <div className='followimg fleximg'><img src={item.is_attention?gouimg:addBigimg} alt="add" /></div>
                <span>{item.is_attention?'已关注':'关注'}</span>
            </div>
            ): (
            // size='small'或者没传size
            <div onClick={this.follow} className={item.is_attention?' interest-button-gray fleximg pointer':'fleximg interest-button pointer'}>
                <div className='followimg fleximg'><img src={item.is_attention?gouimg:addSmallimg} alt="is_attention" /></div>
                <span>{item.is_attention?'已关注':'关注'}</span>
            </div>
            
            )
        
    }
    
}