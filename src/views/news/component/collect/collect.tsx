//@ts-nocheck
import { Component } from 'react'
import './collect.scss'
import $message from '../../../component/message/index';
import {doCollect} from '../../../../service/news'

import collectimg from '../../../../public/images/user/collectBlack.png'
import starActive20img from '../../../../public/images/user/starActive20.png'
import starimg from '../../../../public/images/user/star.png'
import starActiveimg from '../../../../public/images/user/starActive.png'

interface CollectPropsItem{
    is_collection:string | null
    creator_id?:number
}

interface CollectProps{
    item :CollectPropsItem //是否收藏
    css:string //是横还是竖的样式align,justify
}

export default class Collect extends Component<CollectProps> {
    state={
        item:this.props.item
    }
    collectChange=async(e)=>{
        e.stopPropagation() 
        let item = JSON.parse(JSON.stringify(this.state.item))
        let data={
            "news_id": item.id?item.id:window.location.search.split('=')[1],
            "types":item.is_collection?0:1
        }
        const res = await doCollect(data)
        if(res.status){
            item.is_collection=data.types?'1':null
            this.setState({
                item:item
            })
            $message.info(data.types?'收藏成功':'取消收藏')
        }
    }
    
    render(){
        let prop =this.props,{item}=this.state
        return <div onClick={this.collectChange}>
            {prop.css === 'align' ?(<div className='collect-item fleximgc'>
                <div className='fleximg collectimg'><img src={item.is_collection?starActive20img:collectimg} alt="collect" /></div>
                <div className={item.is_collection?'collect-color font12':'font12'}>收藏</div>
            </div> ):prop.css === 'justify' && (<div className='flexl star-item'>
                <div className='fleximg collectimg'><img src={item.is_collection?starActiveimg:starimg} alt="collect" /></div>
                <div className={item.is_collection?'star-color':'color3'}>收藏</div>
            </div> 
            )}
        </div>
        
    }
    
}