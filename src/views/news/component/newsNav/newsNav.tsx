//@ts-nocheck
import { Component } from 'react'
import './newsNav.scss'
import {newsTypeList} from '../../../../service/news'

interface NewsNavState{
    newsIndexChange:(val:number)=>void
    newsTypeActive:number
}

export default class NewsNav extends Component<NewsNavState> {
    state={
        newsType:[],
        newsTypeActive:this.props.newsTypeActive,
    }
    componentDidMount=async()=>{  
        const   {newsTypeActive}=this.props
        const res = await newsTypeList()
        if(res.status){
            this.setState({
                newsType:res.body
            })
            this.props.newsIndexChange(newsTypeActive,res.body[newsTypeActive],0)
        }
    }
    render(){
        let {newsType}=this.state
        let {newsTypeActive}=this.props
        return( 
            <div className='news-type flexl' >
                {newsType.map((item,index)=>(
                <div 
                    key = {index}
                    className={newsTypeActive === index ?'news-type-item news-type-item-active':'news-type-item'}
                    onClick={()=>{
                        // this.setState({newsTypeActive:index})
                        this.props.newsIndexChange(index,item,1)
                        window.scrollTo (0,0);
                    }}
                >{item.name}</div>))}
            </div>
    )}
    
}