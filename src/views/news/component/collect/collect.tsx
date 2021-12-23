import { Component } from 'react'
import './collect.scss'
import Message from '../../../component/message/message'
import $message from '../../../component/message/index';



import collectimg from '../../../../public/images/user/collectBlack.png'
import starimg from '../../../../public/images/user/star.png'
import starActive from '../../../../public/images/user/starActive.png'


interface CollectState{
    collect:boolean //是否收藏
    css:string //是横还是竖的样式align,justify
    collectChange:(val:boolean)=>void
}

export default class Collect extends Component<CollectState> {
    state={
        message:'',
        messageShow:false
    }
    collectChange=()=>{
        //调收藏接口成功后
        this.props.collectChange(!this.props.collect)
        $message.success(!this.props.collect?'收藏成功':'取消收藏')
        // this.setState({
        //     message:!this.props.collect?'收藏成功':'取消收藏',
        //     messageShow:true
        // })

    }
    
    render(){
        let prop =this.props,message=this.state.message,messageShow=this.state.messageShow
        return <div onClick={this.collectChange}>
            {prop.css === 'align' ?(<div className='collect-item fleximgc'>
                <div className='fleximg collectimg'><img src={prop.collect?starActive:collectimg} alt="collect" /></div>
                <div className={prop.collect?'collect-color font12':'font12'}>收藏</div>
            </div> ):prop.css === 'justify' && (<div>

            </div> 
            )}
            {messageShow && <Message text={this.state.message} messageShow={()=>{this.setState({messageShow:false})}}/>}
            
        </div>
    }
    
}