import { Component } from 'react'
import './collect.scss'
import $message from '../../../component/message/index';

import collectimg from '../../../../public/images/user/collectBlack.png'
import starActive20img from '../../../../public/images/user/starActive20.png'
import starimg from '../../../../public/images/user/star.png'
import starActiveimg from '../../../../public/images/user/starActive.png'

interface CollectState{
    collect:boolean //是否收藏
    css:string //是横还是竖的样式align,justify
}

export default class Collect extends Component<CollectState> {
    state={
        collect:this.props.collect
    }
    collectChange=(e)=>{
        e.stopPropagation() 
        //调收藏接口成功后
        let collect = JSON.parse(JSON.stringify(this.state.collect))
        this.setState({
            collect:!collect
        })
        $message.info(!collect?'收藏成功':'取消收藏')

    }
    
    render(){
        let prop =this.props,collect=this.state.collect
        return <div onClick={this.collectChange}>
            {prop.css === 'align' ?(<div className='collect-item fleximgc'>
                <div className='fleximg collectimg'><img src={collect?starActive20img:collectimg} alt="collect" /></div>
                <div className={collect?'collect-color font12':'font12'}>收藏</div>
            </div> ):prop.css === 'justify' && (<div className='flexl star-item'>
                <div className='fleximg collectimg'><img src={collect?starActiveimg:starimg} alt="collect" /></div>
                <div className={collect?'star-color':'color3'}>收藏</div>
            </div> 
            )}
        </div>
    }
    
}