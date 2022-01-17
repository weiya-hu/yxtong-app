//@ts-nocheck
import { Component } from 'react'
import './authorHotArticleItem.scss'
import moment from 'moment'
import falseimg from '../../../../public/images/user/false.png'

interface AuthorHotArticleItemState{
    item:{
        title:string
        readed:number
        update_time:string
        thumb_url:string
    }
}

export default class AuthorHotArticleItem extends Component<AuthorHotArticleItemState> {
    render(){
        let item =this.props.item
        return <div className='flexb AuthorHotArticleItem'>
            <div className='coverimg fleximg'><img src={item.thumb_url?item.thumb_url:falseimg} alt="cover" onError={(e) => { e.target.src = falseimg }}
/></div>
            <div className='flexcbl article-detail'>
                <div className='author-title'>{item.title}</div>
                <div className='flexb' style={{width:'100%'}}>
                    <div className='color3 font12'>{item.readed}阅读</div>
                    <div className='color3 font12'>{moment(item.update_time).format('YYYY-MM-DD HH:mm')}</div>
                </div>
            </div>
        </div>
    }
    
}