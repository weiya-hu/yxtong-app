import { Component } from 'react'
import './commonButton.scss'

export default class CommonButton extends Component<any> {
    constructor(props){
        super(props)
    }
    render(){
        let wordBefore=this.props.wordBefore,wordAfter=this.props.wordAfter,isBefore=this.props.isBefore
        return <div 
                    onClick={()=>{
                        let isBefore = JSON.parse(JSON.stringify(this.props.isBefore))
                        this.props.onclicked(!isBefore)
                    }}
                    className={isBefore?'before fleximg':'after fleximg'}
                >
                {isBefore?wordBefore:wordAfter}
            </div>
            
    }
    
}