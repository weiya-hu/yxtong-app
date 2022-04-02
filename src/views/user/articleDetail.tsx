//@ts-nocheck
import { Component, ReactNode } from 'react'
import './articleDetail.scss'
import moment from 'moment'
import { Button } from 'antd';
import {withRouter} from 'react-router-dom'
import {writingDetail,newsDetail} from 'service/news'
import {promoteArticle} from 'service/user'
import {util} from 'utils/news'

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
class ArticleDetail extends Component<ArticleDetailProps>{
    state={
        newsDetail:{},
        isPreview:false,
        newsId:''
    }
    backReview=()=>{
        this.props.history.push('/app/user?componentId=71&editNewsId=previewBack');
    }
    getNewsDeatail=async()=>{
        let id=util.getUrlParam('readNewsId')
        let newsId=util.getUrlParam('newsId')
        let articleId = util.getUrlParam('articleId')
        //如果是个人中心里面查看文章就是readNewsId，获取的接口不一样
        if(id){
            //preview是预览，自己预设的值，其他新闻id是后端传过来的值
            if(id==='preview'){
                this.setState({
                    newsDetail:JSON.parse(localStorage.getItem('previewNews')) ,
                    isPreview:true
                })
            }else{
                let data={
                    newsId:id
                }
                const res =await writingDetail(data)
                res.status && this.setState({
                    newsDetail:res.body,
                    isPreview:false
                })
            }
         //如果是新闻资讯里面里面查看文章就是newsId，获取的接口不一样
        }else if(newsId){
            let res =await newsDetail({newsId:newsId})
            res.status && this.setState({
                newsDetail:res.body,
                isPreview:false,
                newsId:newsId
            })
        }else if(articleId){
            let res =await promoteArticle({id:articleId})
            res.status && this.setState({
                newsDetail:res.body,
                isPreview:false
            })
        }
    }

    componentDidMount(): void {
        this.getNewsDeatail()
    }
    render(): ReactNode {
        // let {isPreview}= this.props
        let {newsDetail,isPreview,newsId}=this.state
        return (newsDetail && <div className={newsId?'articleDetail position':'articleDetail usermain-ArticleDetail position'}>
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
export default withRouter(ArticleDetail)