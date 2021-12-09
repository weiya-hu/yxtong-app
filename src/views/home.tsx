import { Component } from 'react'
import PopupLogin from './login/popupLogin'


export default class Home extends Component {
    render(){
        return <div className='fleximg back'>
            <PopupLogin />
        </div>
    }
   
    
}