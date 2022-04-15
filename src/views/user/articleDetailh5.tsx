//@ts-nocheck
import { Component } from 'react'
import {promoteArticleh5} from 'service/user'
import {util} from 'utils/news'
import moment from 'moment'
export default class ArticleDetailh5 extends Component {
	state={
		newsDetail:{}
	}
	getContent=async()=>{
		let articleId = util.getUrlParam('articleId')
		let res =await promoteArticleh5({id:articleId})
		res.status && this.setState({
				newsDetail:res.body
		})
	}
	toLogin=()=>{
		let invite_code = util.getUrlParam('invite_code')
		window.location.href='/app/login?invite_code='+invite_code
	}
	componentDidMount(){
		this.getContent()
		document.body.style.overflow='hidden'
	}
	render(){
		const {newsDetail} = this.state
		return <div id='article-detail-h5'>
			<div className='title'>{newsDetail.title}</div>
			<div className='flexb article-detail-info'>
				<div className='from'>来源：{newsDetail.creator_name}</div>
				<div className='from'>发布日期：{moment(newsDetail.update_time).format('YYYY年MM月DD日')}</div>
			</div>
			<div dangerouslySetInnerHTML = {{__html:newsDetail.content}} className='news-content'></div>
			<div className='foot-more fleximg'>
				<div className='fleximg' onClick={this.toLogin}>查看更多</div>
			</div>
		</div>
	}
    
}