import { Component } from 'react'
import './task.scss'

export default class Task extends Component<any> {
    constructor(props){
        super(props)
    }
    render(){
        return <div className='taskitem'>
                   <div>{this.props.title}</div> 
                   <div className='score'>{this.props.score}</div> 
            </div>
            
    }
    
}