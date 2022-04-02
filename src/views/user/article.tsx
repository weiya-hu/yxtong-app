import { Component } from 'react'
import {util} from 'utils/news'
import ArticleDetail from './articleDetail'
import 'views/user/article.scss'
import {promoteIndustry,promoteArticlePage,promoteIntegral} from 'service/user'

import copyLinkimg from 'public/images/user/copyLink.png'
import shareNumimg from 'public/images/user/shareNum.png'
import { Divider } from 'antd'

export default class Article extends Component {
  state={
    articleId:null,
    integralPage:1,
    integralSize:5,
    integralList:[],
    IndustryList:[]
  }
  star=async()=>{
    const {integralPage,integralSize} = this.state
    const promoteIndustryRes = await promoteIndustry()
    const promoteIntegralRes = await promoteIntegral({current:integralPage,size:integralSize});
    (promoteIndustryRes.status && promoteIntegralRes.status) && this.setState({
      integralList:promoteIntegralRes.body.records,
      IndustryList:promoteIndustryRes.body
    })
  }
  componentDidMount(){
    let articleId= Number(util.getUrlParam('articleId'))
    articleId && this.setState({articleId:articleId})
    this.star()
  }
  render(){
    const {articleId,integralList} =this.state
    return <div id='article'>
      {articleId && <div>
        <ArticleDetail />
      </div>}
      {!articleId && <div className='article-content'>
        <div className='top-item'>
          <div className='width position'>
            <div className='article-top'>
              <div className='top-blue'>
                <div className='user-score flexb'>
                  {integralList.map((item,index)=><div key={index}>用户{item.name},获得{item.value}积分</div> )}
                </div>
                <div className='top-share-title'>分享好友得奖励</div>
                <div className='top-share-txt'>点击复制链接/扫码分享 --- 发送微信好友或朋友圈 --- 用户通过链接完成会员注册 --- 推广成功，获得积分奖励</div>
                <div className='flexl'>
                  <div className='copyLinkimg-pre fleximg'>
                    <div className='copyLinkimg fleximg'><img src={copyLinkimg} alt="copyLink" /></div>复制链接
                  </div>
                  <div className='copyLinkimg-pre fleximg'>
                    <div className='copyLinkimg fleximg'><img src={shareNumimg} alt="copyLink" /></div>扫码分享
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>正文</div>
      </div>
      }
    </div>
  }
    
}