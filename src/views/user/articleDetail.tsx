import { Component, ReactNode } from 'react'
import './articleDetail.scss'
import moment from 'moment'

interface ArticleDetailProps{
    newsDetail:{
        commented?: number
        content?: string
        create_time?: number
        creator_name?: string
        readed?: number
        title?: string
        update_time?: number
    }
}
export default class ArticleDetail extends Component<ArticleDetailProps>{
    state={
        // detail:{
        //     title:'兴证全球谢治宇：电商15%的增速相比社零4%的增长，人具有显著优势，传统线下胜者为王，711全家初显成色',
        //     time:'2021年9月23日 09:25',
        //     from:'原创',
        //     read:2039
        // },
        newsDetail:this.props.newsDetail
    }
    render(): ReactNode {
        let {newsDetail} = this.props
        return(
            newsDetail && <div className='articleDetail'>
                <div className='title'>{newsDetail.title}</div>
                <div className='flexb detail-info'>
                    <div className='flexl'>
                        <div>{moment(newsDetail.create_time).format('YYYY月MM月DD HH:mm')}</div>
                        <div className='detail-from'>来源：{newsDetail.creator_name}</div>
                    </div>
                    <div>阅读量： {newsDetail.readed}</div>
                </div>
                <div className='news-content'>
                    {newsDetail.content}
                </div>
            </div>
        )
    }
}