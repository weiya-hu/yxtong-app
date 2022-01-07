import { Component } from 'react'
import './favorbutton.scss'

import favorimg from '../../../../public/images/user/favor.png'
import favorActiveimg from '../../../../public/images/user/favorActive.png' 

interface CommentListItemProps{
    item:{
        name:string,
        comment:string,
        time:string,
        favor:number,
        isfavor:boolean
    }
}
export default class Favorbutton extends Component<CommentListItemProps> {
    state={
        item:this.props.item
    }
    favor=()=>{
        let item=JSON.parse(JSON.stringify(this.state.item)) 
        item.isfavor=!item.isfavor
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
            ><img src={item.isfavor?favorActiveimg:favorimg} alt="favor" /></div>
            <div className={item.isfavor?'font12 favorcolor':'font12 color3'}>{item.favor}</div>
        </div>
    }
    
}