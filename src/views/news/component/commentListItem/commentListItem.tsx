import { Component } from 'react'
import './commentListItem.scss'
import FavorButton from '../favorbutton/favorbutton'

import favorimg from '../../../../public/images/user/favor.png'

interface CommentListItemProps{
    item:{
        name:string,
        comment:string,
        time:string,
        favor:number,
        isfavor:boolean
    }
    size:string
}

export default class CommentListItem extends Component<CommentListItemProps> {
    favor=()=>{

    }
    render(){
        const {item,size }=this.props
        return <div className='flexbl comment-list-item'>
            <div className='fleximg headerimg'><img src={favorimg} alt="header" /></div>
            <div className={size==='big'?'flexcbl comment-list-item-right':'flexcbl comment-list-item-right comment-list-item-right-small'}>
                <div className='flexb comment-list-item-right-top'>
                     <div className='font16 bold'>{item.name}</div>
                     <div>
                          <FavorButton item={item}/>
                     </div>
                </div>
                <div className='comment-text'>{item.comment}</div>
                <div className='font12 color3'>{item.time}</div>
            </div>
        </div>
    }
    
}