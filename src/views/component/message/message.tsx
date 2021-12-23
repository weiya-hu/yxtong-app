import { Component } from 'react'
import './message.scss'

interface MessageState{
    text:string,
    messageShow:(val:boolean)=>void
}


export default class Message extends Component<MessageState> {
    state={
        timer:null,
        show:true
    }
    componentDidMount(){
        this.state.timer=setTimeout(()=>{
            this.setState({
                show:false
            })
            this.props.messageShow(false)
        },2000) 
    }
    render(){
        return <div className={this.state.show?'message':'none'}>{this.props.text}</div>
    }
    
}