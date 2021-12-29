import { Component } from 'react'
import './newsNav.scss'

interface NewsNavState{
    newsIndexChange:(val:number)=>void
}

export default class NewsNav extends Component<NewsNavState> {
    state={
        newsType:['关注','推荐','热榜','抗疫','健康','小说','娱乐','美食','财经','更多'],
        newsTypeActive:0,
    }
    render(){
        let newsType=this.state.newsType,newsTypeActive=this.state.newsTypeActive
        return( 
            <div className='news-type flexl'>
                {newsType.map((item,index)=>(
                <div 
                    key = {index}
                    className={newsTypeActive === index ?'news-type-item news-type-item-active':'news-type-item'}
                    onClick={()=>{
                        this.setState({newsTypeActive:index})
                        this.props.newsIndexChange(index)
                        
                    }}
                >{item}</div>))}
            </div>
    )}
    
}