//@ts-nocheck
import { Component } from 'react'

export default class Develop extends Component {
    render(){
        return <div>develop
            <div onClick={()=>{
                this.props.history.goBack();
                console.log(window.history)
                }
            }>返回</div>
        </div>
    }
    
}