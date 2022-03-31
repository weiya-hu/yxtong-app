import { Component } from 'react'
import './mine.scss'
import {newsCreationcollection} from 'service/news'

export default class MyCollect extends Component {
    state={
        topTitle:['收藏的文章','收藏的视频'],
        topTitleActive:0,
        page:1,
        size:10,
        collectList:[]
    }
    getCollection=async()=>{
        const {page,size} =this.state
        const {status,body}= await newsCreationcollection({current:page,size:size})
        status && this.setState({collectList:body.records})
    }
    componentDidMount(){
        this.getCollection()
    }

    render(){
        const {topTitle,topTitleActive} = this.state
        return <div id='myCollect'>
            <div className='top-title flexl'>
                {topTitle.map((item,index)=>(
                <div 
                    key={index}
                    className={topTitleActive == index ? 'top-title-a top-title-item':'top-title-item'}
                    onClick={()=>{this.setState({topTitleActive:index})}}
                >{item}</div> ))}
            </div>
            <div>
                
            </div>
        </div>
    }
    
}