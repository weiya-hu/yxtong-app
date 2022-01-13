import { Component } from 'react'
import './favorbutton.scss'

import favorimg from '../../../../public/images/user/favor.png'
import favorActiveimg from '../../../../public/images/user/favorActive.png' 

interface CommentListItemProps{
    item:{
        username:string,
        content:string,
        update_time:number,
        favor_num:number,
        is_favor:boolean
    }
}
export default class Favorbutton extends Component<CommentListItemProps> {
    state={
        item:this.props.item
    }
    favor=()=>{
        let item=JSON.parse(JSON.stringify(this.state.item)) 
        item.is_favor=!item.is_favor
        this.setState({
            item:item
        })
    }
    render(){
        const {item}=this.state
        return <div className='flexr'>
            <div 
                className='fleximg favorimg'
                onClick={this.favor}
            ><img src={item.is_favor?favorActiveimg:favorimg} alt="favor" /></div>
            <div className={item.is_favor?'font12 favorcolor':'font12 color3'}>{item.favor_num}</div>
        </div>
    }
    
}