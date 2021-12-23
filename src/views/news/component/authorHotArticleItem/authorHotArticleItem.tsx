import { Component } from 'react'
import './authorHotArticleItem.scss'

interface AuthorHotArticleItemState{
    item:{
        title:string
        read:number
        time:string
    }
}

export default class AuthorHotArticleItem extends Component<AuthorHotArticleItemState> {
    render(){
        let item =this.props.item
        return <div className='flexb AuthorHotArticleItem'>
            <div className='coverimg fleximg'><img src="cover" alt="cover" /></div>
            <div className='flexcbl article-detail'>
                <div className='author-title'>{item.title}</div>
                <div className='flexb' style={{width:'100%'}}>
                    <div className='color3 font12'>{item.read}阅读</div>
                    <div className='color3 font12'>{item.time}</div>
                </div>
            </div>
        </div>
    }
    
}