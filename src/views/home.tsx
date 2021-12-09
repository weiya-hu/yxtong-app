import { Component } from 'react'
import PopupLogin from './login/popupLogin'
import {doLogin} from '../service/login'


export default class Home extends Component {
    getinfo=async()=>{
        let data = {
            username: 'admin',
            passwd: '123',
            code: 'hjkj'
        }
        const res =await doLogin(data)
        console.log(res)
    }
    componentDidMount(){
        // this.getinfo()
    }
    render(){
        return <div className='fleximg back'>
            <PopupLogin />
        </div>
    }
   
    
}