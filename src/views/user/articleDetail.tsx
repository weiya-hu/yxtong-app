import { Component, ReactNode } from 'react'
import './articleDetail.scss'
import moment from 'moment'
import { Button } from 'antd';

interface ArticleDetailProps{
    newsDetail:{
        commented?: number
        content?: string
        create_time?: number
        creator_name?: string
        readed?: number
        title?: string
        update_time?: number
        sendCoverImgurl?:string
    },
    isPreview?:boolean
    backReview?:(val:boolean)=>void
}
export default class ArticleDetail extends Component<ArticleDetailProps>{
    state={
        detail:{
            title:'马英九发声后，国民党终于拿出一铁证，“台湾属于中国”响彻岛内！',
            create_time:1641520819085,
            creator_name:'原创',
            readed:2039,
            content:'今年9月份，前台湾地区领导人马英九在参加一场新书发布会接受媒体采访时，拿出了台湾属于中国的铁证，当时，马英九表示，《开罗宣言》中明确指出，“日本盗窃中国的领土，例如东北三省，台湾等等'
        },
        newsDetail:this.props.newsDetail
    }
    backReview=()=>{
        this.props.backReview(true)
    }
    render(): ReactNode {
        let {newsDetail,isPreview}= this.props
        console.log(newsDetail)
        return(
            newsDetail && 
            <div className='articleDetail position'>
                {isPreview && <div className='back-button' onClick={this.backReview}>
                    <Button type='ghost' size='small'>退出预览</Button>
                </div> }
                <div className='title'>{newsDetail.title}</div>
                <div className='flexb detail-info'>
                    <div className='flexl'>
                        <div>{moment(newsDetail.update_time).format('YYYY年MM月DD日 HH:mm')}</div>
                        <div className='detail-from'>来源：{newsDetail.creator_name}</div>
                    </div>
                    <div>阅读量： {newsDetail.readed}</div>
                </div>
                <div dangerouslySetInnerHTML = {{__html:newsDetail.content}} className='news-content'></div>
            </div>
        )
    }
}