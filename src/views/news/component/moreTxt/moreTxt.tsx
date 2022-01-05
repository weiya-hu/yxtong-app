import { Component } from 'react'
import './moreTxt.scss'

import loadingimg from '../../../../public/images/user/loading.png'

interface MoreTxtState{
    hasMore:boolean
}

export default class MoreTxt extends Component<MoreTxtState> {
    
    render(){
        const { hasMore } = this.props
        return <div className='more-txt'>
            {hasMore?(
              <div className='fleximg news-loading'>
                <div className='fleximg loadingimg'><img src={loadingimg} alt="loading" /></div>
                <div className='font12 color3'>正在获取更多内容</div>
              </div>): (
              <div className='fleximg news-loading'>
              <div className='font12 color3'>没有更多内容了</div>
              </div>)
            } 
        </div>
    }
    
}