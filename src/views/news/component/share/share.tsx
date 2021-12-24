import { Component } from 'react'
import './share.scss'

import shareimg from '../../../../public/images/user/share.png'
import shareActiveimg from '../../../../public/images/user/shareActive.png'
import shareBlackimg from '../../../../public/images/user/shareBlack.png'
import shareActive20img from '../../../../public/images/user/shareActive20.png'
import doubanimg from '../../../../public/images/user/16douban.png' 
import linkimg from '../../../../public/images/user/16link.png' 
import qqimg from '../../../../public/images/user/16QQ.png' 
import qqkjimg from '../../../../public/images/user/16qqkj.png' 
import toutiaoimg from '../../../../public/images/user/16toutiao.png' 
import wechartimg from '../../../../public/images/user/16wechart.png' 
import weiboimg from '../../../../public/images/user/16weibo.png' 

interface ShareState{
    css:string
}

export default class Share extends Component<ShareState> {  
    state={
        shareActive:false
    } 
    render(){
        let prop = this.props,shareActive=this.state.shareActive
        return <div 
                    onMouseEnter ={()=>{this.setState({shareActive:true})}} 
                    onMouseLeave ={()=>{this.setState({shareActive:false})}}
                    className='position share-item-pre'
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
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={wechartimg} alt="wechart" /></div>
                    <div>微信</div>
                </div>
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={qqimg} alt="wechart" /></div>
                    <div>QQ</div>
                </div>
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={doubanimg} alt="wechart" /></div>
                    <div>豆瓣</div>
                </div>
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={weiboimg} alt="wechart" /></div>
                    <div>新浪微博</div>
                </div>
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={qqkjimg} alt="wechart" /></div>
                    <div>QQ空间</div>
                </div>
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={toutiaoimg} alt="wechart" /></div>
                    <div>今日头条</div>
                </div>
                <div className='flexl'>
                    <div className='wechartimg fleximg'><img src={linkimg} alt="wechart" /></div>
                    <div>复制链接</div>
                </div>
            </div>
        </div>
    }
    
}