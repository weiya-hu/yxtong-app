//@ts-nocheck
import { Component } from 'react'
import './collect.scss'
import $message from 'views/component/message/index';
import {doCollect} from 'service/news'
import {util} from 'utils/news'

import store from 'store'
import { loginShow } from 'store/actionCreators'

import collectimg from 'public/images/user/collectBlack.png'
import starActive20img from 'public/images/user/starActive20.png'
import starimg from 'public/images/user/star.png'
import starActiveimg from 'public/images/user/starActive.png'
import { withSuccess } from 'antd/lib/modal/confirm';

interface CollectPropsItem{
    is_collection:string | null
    creator_id?:number
    
}

interface CollectProps{
    item :CollectPropsItem //是否收藏
    css:string //是横还是竖的样式align,justify
    success?:()=>void
}

export default class Collect extends Component<CollectProps> {
    state={
        item:this.props.item
    }
    collectChange=async(e)=>{
        e.stopPropagation()
        const userInfo = store.getState().userInfo
        if(userInfo){
            let item = JSON.parse(JSON.stringify(this.state.item))
            // let url = window.location.href
            // let id=url.substring(url.indexOf('=')+1,url.length)
            let id = util.getUrlParam('newsId')
            let data={
                "news_id": item.id?item.id:id,
                "types":item.is_collection?0:1
            }
            const res = await doCollect(data)
            if(res.status){
                item.is_collection=data.types?'1':null
                this.setState({
                    item:item
                })
                $message.info(data.types?'收藏成功':'取消收藏')
                this.props.success(data.types)
            }
        }else{
            store.dispatch(loginShow())
        }
    }
    
    render(){
        let prop =this.props,{item}=this.state
        console.log(prop)
        return <div onClick={this.collectChange}>
            {prop.css === 'align' ?(<div className='collect-item fleximgc pointer'>
                <div className='fleximg collectimg'><img src={item.is_collection?starActive20img:collectimg} alt="collect" /></div>
                <div className={item.is_collection?'collect-color font12':'font12'}>收藏</div>
            </div> ):prop.css === 'justify' && (<div className='flexl star-item pointer'>
                <div className='fleximg collectimg'><img src={item.is_collection?starActiveimg:starimg} alt="collect" /></div>
                <div className={item.is_collection?'star-color':'color3'}>收藏</div>
            </div> 
            )}
        </div>
        
    }
    
}