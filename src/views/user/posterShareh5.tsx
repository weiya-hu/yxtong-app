//@ts-nocheck
import { Component } from 'react'
import axios from 'axios'
import './posterShareh5.scss'
import { util } from 'utils/user'

import falseimg from 'public/images/user/false.png'

export default class PosterShareh5 extends Component {
  state={
    imgUrl:''
  }
  getBase64=(img)=> {
    const base64Url = `data:image/png;base64,${window.btoa(
      new Uint8Array(img).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )}`;
    return base64Url;
  }
  star=async()=>{
    let posterId = util.getUrlParam('posterId')
    let uid = util.getUrlParam('uid')
    axios({url:'/user/public/promote/poster/share.do', method:'post',data:{id:posterId,uid:uid},responseType:"arraybuffer",headers: { MODULE: 'user' }}).then(res=>{
      this.setState({
        imgUrl:this.getBase64(res.data)
      })
    })
  }
  componentDidMount(){
    this.star()
  }
	render(){
    const {imgUrl} =this.state
		return <div className='posterShareh5'>
      {imgUrl && <div>
          <div className='fleximg posterimg'><img src={imgUrl} alt="poster" onError={(e) => { e.target.src = falseimg }}/></div>
          <div className='operate-title'>操作指引</div>
          <div className='operate-text'>1、长按图片3s，出现“转发给朋友”字样</div>
          <div className='operate-text'>2、点击该字样，转发给你的好友或群</div>
          <div className='operate-text'>3、当好友看到你分享的图片素材时，长按识别二维码，即可完成注册/登录</div>
          <div className='operate-text'>4、好友成功注册完成后，获得奖励</div>
        </div>
      }
    </div>
	}
}