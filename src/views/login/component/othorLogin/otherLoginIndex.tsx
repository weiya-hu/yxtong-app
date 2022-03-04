import { Component } from 'react'

export default class OtherLoginIndex extends Component {

    
    componentDidMount(){
        console.log(window.location.href)
    }
    render(){
        return <div className='otherLoginIndex'></div>
    }
   
    
}