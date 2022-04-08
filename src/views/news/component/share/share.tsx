//@ts-nocheck
import { Component } from 'react'
import './share.scss'
import QRCode  from 'qrcode.react'
import {util} from 'utils/news'
import store from 'store'

import shareimg from 'public/images/user/share.png'
import shareActiveimg from 'public/images/user/shareActive.png'
import shareBlackimg from 'public/images/user/shareBlack.png'
import shareActive20img from 'public/images/user/shareActive20.png'
import doubanimg from 'public/images/user/16douban.png' 
import linkimg from 'public/images/user/16link.png' 
import qqimg from 'public/images/user/16QQ.png' 
import qqkjimg from 'public/images/user/16qqkj.png' 
import toutiaoimg from 'public/images/user/16toutiao.png' 
import wechartimg from 'public/images/user/16wechart.png' 
import weiboimg from 'public/images/user/16weibo.png' 

import weibogray from 'public/images/user/weibogray.png' 
import doubangray from 'public/images/user/doubangray.png' 
import QQgray from 'public/images/user/QQgray.png' 
import qqklgray from 'public/images/user/qqklgray.png' 
import toutgray from 'public/images/user/toutgray.png' 

interface ShareState{
    css:string
    item:{id?:string}
}

export default class Share extends Component<ShareState> {  
    state={
        shareActive:false,
        copyUrl:"",
        shareUrl:''
    } 
    copyLink=()=>{
        let newsId = util.getUrlParam('newsId')
        let id =this.props.item.id?this.props.item.id:newsId
        this.copy(window.location.protocol+'//'+window.location.host+'/app/newsdetail/?newsId='+id)
        
    }
    componentDidMount(){
        let newsId = util.getUrlParam('newsId')
        let componentId = util.getUrlParam('componentId')
        let id =this.props.item.id?this.props.item.id:newsId
        let userInfo=store.getState().userInfo
       
         //判断如果是在个人中心我要推广页面的分享
        if(componentId){
            let urls =window.location.protocol+'//'+window.location.host+'/app/user?componentId=41&articleId='+id+'&invite_code='+userInfo.invite_code
            let shareUrl = window.location.protocol+'//'+window.location.host+'/app/user/articledetail?articleId='+id+'&invite_code='+userInfo.invite_code
            this.setState({copyUrl:urls,shareUrl:shareUrl})
        }else {//其他情况分享的链接暂时都是新闻详情
            if(userInfo){
                let urls =window.location.protocol+'//'+window.location.host+'/app/newsdetail?newsId='+id+'&invite_code='+userInfo.invite_code
                 this.setState({copyUrl:urls,shareUrl:urls})
            }else{
                let urls =window.location.protocol+'//'+window.location.host+'/app/newsdetail?newsId='+id
                this.setState({copyUrl:urls,shareUrl:urls})
            }
        }
        
    }
    render(){
        let prop = this.props
        let {shareActive,copyUrl,shareUrl}=this.state
        return <div 
                    onMouseEnter ={()=>{this.setState({shareActive:true})}} 
                    onMouseLeave ={()=>{this.setState({shareActive:false})}}
                    className='position share-item-pre pointer'
                    onClick={(e)=>e.stopPropagation()}
                >
            {prop.css === 'align'?( <div className='fleximgc share-item'>
                <div className='fleximg shareimg'><img src={shareActive?shareActive20img:shareBlackimg} alt="share" /></div>
                <div className={shareActive?'font12 active-color':'font12'}>分享</div>
            </div> ):
            prop.css === 'justify'&&(<div className='flexl share-justify'>
                <div className='fleximg shareimg'><img src={shareActive?shareActiveimg:shareimg} alt="share" /></div>
                <div className={shareActive?'active-color':'color3'}>分享</div>
            </div> )}
            <div className={prop.css === 'align'?'share-item-module':'share-item-module share-item-module-justify'}>
                <div className='angle'></div>
                <div className='share-item-module-opacity'></div>
                <div className='flexl position share-wechat'>
                    <div className='wechartimg fleximg'><img src={wechartimg} alt="wechart" /></div>
                    <div>微信</div>
                    {/* <div>{window.location.protocol+'//'+window.location.host+'/app/newsdetail/?newsId='+this.props.item.id}</div> */}
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
                
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={QQgray} alt="wechart" /></div>
                    <div>QQ</div>
                </div>
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={doubangray} alt="wechart" /></div>
                    <div>豆瓣</div>
                </div>
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={weibogray} alt="wechart" /></div>
                    <div>新浪微博</div>
                </div>
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={qqklgray} alt="wechart" /></div>
                    <div>QQ空间</div>
                </div>
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={toutgray} alt="wechart" /></div>
                    <div>今日头条</div>
                </div>
                <div className='flexl' onClick={()=>util.copy(copyUrl)}>
                    <div className='wechartimg fleximg'><img src={linkimg} alt="wechart" /></div>
                    <div>复制链接</div>
                </div>
            </div>
        </div>
    }
    
}