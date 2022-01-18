import { Component } from 'react'
import './favorbutton.scss'
import {newsAddPrais} from '../../../../service/news'

import favorimg from '../../../../public/images/user/favor.png'
import favorActiveimg from '../../../../public/images/user/favorActive.png' 

interface CommentListItemProps{
    item:{
        username:string,
        content:string,
        update_time:number,
        favor_num:number,
        is_favor:string,
        comment_id:number
    }
}
export default class Favorbutton extends Component<CommentListItemProps> {
    state={
        item:this.props.item
    }
    favor=async()=>{
        let item=JSON.parse(JSON.stringify(this.state.item)) 
        let data={
            "comment_id": item.comment_id,
            "types": item.is_favor === '1'?0:1
        }
        const res = await newsAddPrais(data)
        if(res.status){
            item.is_favor=item.is_favor === '1'?null:'1';
            item.favor_num=item.is_favor === '1'?item.favor_num+1:item.favor_num-1
            this.setState({
                item:item
            })
        }
    }
    render(){
        const {item}=this.state
        return <div className='flexr'>
            <div 
                className='fleximg favorimg'
                onClick={this.favor}
            ><img src={item.is_favor==='1'?favorActiveimg:favorimg} alt="favor" /></div>
            <div className={item.is_favor==='1'?'font12 favorcolor':'font12 color3'}>{item.favor_num>0 && item.favor_num}</div>
        </div>
    }
    
}