import { Component } from 'react'
import './comment.scss'
import CommentInput from '../commentInput/commentInput'

export default class Comment extends Component {
    
    render(){
        
        return <div className='comment-component'>
            <div>
                <CommentInput size='big'/>
            </div>
            
        </div>
    }
    
}