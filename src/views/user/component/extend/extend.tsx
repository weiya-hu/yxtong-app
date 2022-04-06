import { Component } from 'react'
import './extend.scss'
import {promoteIntegral} from 'service/user'
import {util} from 'utils/news'
import store from 'store'
import QRCode  from 'qrcode.react'

import copyLinkimg from 'public/images/user/copyLink.png'
import shareNumimg from 'public/images/user/scan.png'

export default class Extend extends Component {
  state={
    current:1,
    size:5,
    integralList:[],
    shareUrl:''
  }
  star=async()=>{
    const {current,size} = this.state
    const userInfo = store.getState().userInfo
    const {status,body} = await promoteIntegral({current,size});
    status && this.setState({
      integralList:body.records,
      shareUrl:window.location.protocol+'//'+window.location.host+'/app/login?invite_code='+userInfo.invite_code
    })
  }
  componentDidMount(){
    this.star()
  }
  render(){
    const {integralList,shareUrl} =this.state
    return  <div className='top-blue'>
        <div className='user-score flexb'>
          {integralList.map((item,index)=><div key={index}>用户{item.name},获得{item.value}积分</div> )}
        </div>
        <div className='top-share-title'>分享好友得奖励</div>
        <div className='top-share-txt'>点击复制链接/扫码分享 --- 发送微信好友或朋友圈 --- 用户通过链接完成会员注册 --- 推广成功，获得积分奖励</div>
        <div className='flexl'>
          <div className='copyLinkimg-pre fleximg' onClick={()=>util.copy(shareUrl)}>
            <div className='copyLinkimg fleximg'><img src={copyLinkimg} alt="copyLink" /></div>复制链接
          </div>
          <div className='copyLinkimg-pre fleximg wechat-ma-pre'>
            <div className='copyLinkimg fleximg'><img src={shareNumimg} alt="copyLink" /></div>扫码分享
            <div className='wechat-ma'>
              <QRCode
                value={shareUrl}  //value参数为生成二维码的链接
                size={100} //二维码的宽高尺寸
                fgColor="#000000"  //二维码的颜色
              />
              <div className='wechat-ma-txt'>微信扫码分享</div>
              <div className='wechat-ma-blank'></div>
            </div>
          </div>
        </div>
        </div>
      
  }
}